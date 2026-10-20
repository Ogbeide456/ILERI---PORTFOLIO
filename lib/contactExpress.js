import express from 'express';
import dns from 'node:dns';
import dbConnect from './mongodb';
import Contact from '../models/Contact';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const app = express();

app.use(express.json({ limit: '1mb' }));
app.use((req, _res, next) => {
  if (req.url.startsWith('/api/contact')) {
    const routePath = req.url.slice('/api/contact'.length);
    req.url = routePath.startsWith('/') ? routePath : `/${routePath}`;
  }
  next();
});

app.get('/', async (_req, res) => {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve contact submissions from database.',
    });
  }
});

app.post('/', async (req, res) => {
  try {
    const { firstName, lastName, name, email, message } = req.body || {};
    let parsedFirstName = (typeof firstName === 'string' ? firstName : '').trim();
    let parsedLastName = (typeof lastName === 'string' ? lastName : '').trim();

    if ((!parsedFirstName || !parsedLastName) && typeof name === 'string' && name.trim()) {
      const parts = name.trim().split(/\s+/);
      parsedFirstName = parsedFirstName || parts[0] || '';
      parsedLastName = parsedLastName || parts.slice(1).join(' ') || '-';
    }

    if (!parsedFirstName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid first name.',
      });
    }

    if (!parsedLastName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid last name.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email address.',
      });
    }

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    const emailDomain = email.trim().split('@')[1];
    try {
      const mx = await dns.promises.resolveMx(emailDomain);
      if (mx.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email address',
        });
      }
    } catch (error) {
      const errorCode =
        error && typeof error === 'object' && 'code' in error
          ? error.code
          : undefined;

      if (errorCode === 'ENODATA' || errorCode === 'ENOTFOUND' || errorCode === 'EINVAL') {
        return res.status(400).json({
          success: false,
          error: 'Invalid email address',
        });
      }

      console.error('Email domain verification error:', error);
      return res.status(503).json({
        success: false,
        error: 'Unable to verify the email domain right now. Please try again later.',
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message.',
      });
    }

    await dbConnect();

    const newSubmission = await Contact.create({
      firstName: parsedFirstName,
      lastName: parsedLastName,
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: {
        id: newSubmission._id,
        firstName: newSubmission.firstName,
        lastName: newSubmission.lastName,
        email: newSubmission.email,
        message: newSubmission.message,
        createdAt: newSubmission.createdAt,
      },
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? error.message
        : 'An unexpected error occurred while saving to MongoDB. Please try again later.';
    const errorName =
      error && typeof error === 'object' && 'name' in error
        ? error.name
        : undefined;
    const isIpError =
      errorName === 'MongooseServerSelectionError' ||
      (typeof errorMessage === 'string' &&
        (errorMessage.includes('whitelist') ||
          errorMessage.includes('Could not connect to any servers')));

    return res.status(500).json({
      success: false,
      error: isIpError
        ? 'MongoDB connection failed: Your IP address is not whitelisted in MongoDB Atlas. Go to cloud.mongodb.com -> Network Access -> Add IP Address -> "Allow Access from Anywhere" (0.0.0.0/0).'
        : errorMessage,
    });
  }
});

app.all('/', (_req, res) => {
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    success: false,
    error: 'Method Not Allowed',
  });
});

app.use((error, _req, res, _next) => {
  console.error('Contact API request error:', error);
  const status = error?.status === 400 ? 400 : 500;
  return res.status(status).json({
    success: false,
    error: status === 400 ? 'Invalid JSON request body.' : 'Unexpected contact API error.',
  });
});

export default function contactExpressHandler(req, res) {
  app(req, res, (error) => {
    if (error) {
      console.error('Contact Express handler error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Unexpected contact API error.',
        });
      }
    } else if (!res.headersSent) {
      res.status(404).json({
        success: false,
        error: 'Contact API route not found.',
      });
    }
  });
}
