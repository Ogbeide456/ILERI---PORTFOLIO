import express from 'express';
import dbConnect from './mongodb';
import Contact from '../models/Contact';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const app = express();

async function sendContactEmail({ firstName, lastName, email, message }) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const recipient = process.env.EMAILJS_TO_EMAIL;

  if (!serviceId || !templateId || !publicKey || !recipient) {
    console.error('EmailJS delivery skipped: server configuration is incomplete.');
    return 'EMAILJS_NOT_CONFIGURED';
  }

  if (!privateKey) {
    console.error('EmailJS delivery skipped: private key is not configured.');
    return 'EMAILJS_PRIVATE_KEY_REQUIRED';
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          from_name: `${firstName} ${lastName}`,
          name: `${firstName} ${lastName}`,
          user_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          from_email: email,
          user_email: email,
          email,
          reply_to: email,
          message,
          to_email: recipient,
          to_name: 'Ileri',
        },
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const providerMessage = (await response.text()).toLowerCase();
      const errorCode =
        response.status === 403 && providerMessage.includes('private key')
          ? 'EMAILJS_PRIVATE_KEY_REQUIRED'
          : response.status === 403 &&
              providerMessage.includes('non-browser environments')
            ? 'EMAILJS_SERVER_ACCESS_DISABLED'
          : response.status === 400
            ? 'EMAILJS_CONFIGURATION_ERROR'
            : 'EMAILJS_PROVIDER_ERROR';
      console.error('EmailJS delivery failed:', {
        status: response.status,
        errorCode,
      });
      return errorCode;
    }

    return null;
  } catch (error) {
    console.error(
      'EmailJS delivery request failed:',
      error instanceof Error ? error.name : 'UnknownError'
    );
    return 'EMAILJS_NETWORK_ERROR';
  }
}

app.use(express.json({ limit: '1mb' }));
app.use((req, _res, next) => {
  if (req.url.startsWith('/api/contact')) {
    const routePath = req.url.slice('/api/contact'.length);
    req.url = routePath.startsWith('/') ? routePath : `/${routePath}`;
  }
  next();
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

    const emailError = await sendContactEmail({
      firstName: newSubmission.firstName,
      lastName: newSubmission.lastName,
      email: newSubmission.email,
      message: newSubmission.message,
    });
    const emailSent = emailError === null;

    return res.status(201).json({
      success: true,
      emailSent,
      emailError,
      message: emailSent
        ? 'Message saved and email sent successfully.'
        : 'Message saved, but the email could not be sent.',
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
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? error.message
        : 'An unexpected error occurred while saving to MongoDB. Please try again later.';
    const errorName =
      error && typeof error === 'object' && 'name' in error
        ? error.name
        : undefined;
    const errorCode =
      error && typeof error === 'object' && 'code' in error
        ? error.code
        : undefined;
    const serverErrors =
      error &&
      typeof error === 'object' &&
      'reason' in error &&
      error.reason &&
      typeof error.reason === 'object' &&
      'servers' in error.reason &&
      error.reason.servers &&
      typeof error.reason.servers.values === 'function'
        ? Array.from(error.reason.servers.values())
            .map((server) => server && server.error)
            .filter(Boolean)
        : [];
    const networkError = serverErrors[0];
    const causeCode =
      networkError &&
      typeof networkError === 'object' &&
      'cause' in networkError &&
      networkError.cause &&
      typeof networkError.cause === 'object' &&
      'code' in networkError.cause
        ? networkError.cause.code
        : undefined;
    const isMissingMongoUri =
      typeof errorMessage === 'string' &&
      errorMessage.includes('Please define the MONGODB_URI');
    const mongoErrorCode =
      errorName === 'MongooseServerSelectionError'
        ? causeCode && String(causeCode).startsWith('ERR_SSL')
          ? 'MONGODB_TLS_CONNECTION_FAILED'
          : 'MONGODB_CONNECTION_FAILED'
        : errorName === 'MongoParseError'
          ? 'MONGODB_INVALID_URI'
          : errorCode === 18
            ? 'MONGODB_AUTHENTICATION_FAILED'
            : errorCode === 13
              ? 'MONGODB_PERMISSION_DENIED'
              : errorName === 'ValidationError'
                ? 'MONGODB_DOCUMENT_VALIDATION_FAILED'
                : 'MONGODB_SAVE_FAILED';

    console.error('Contact submission failed:', {
      name: errorName || 'UnknownError',
      code: errorCode || 'none',
      causeCode: causeCode || 'none',
      diagnostic: mongoErrorCode,
    });

    return res.status(500).json({
      success: false,
      errorCode: isMissingMongoUri ? 'MONGODB_NOT_CONFIGURED' : mongoErrorCode,
      error: 'Unable to save your message right now.',
    });
  }
});

app.all('/', (_req, res) => {
  res.setHeader('Allow', ['POST']);
  return res.status(405).json({
    success: false,
    error: 'Method Not Allowed',
  });
});

app.use((error, _req, res, _next) => {
  console.error('Contact API request failed:', {
    name: error?.name || 'UnknownError',
    code: error?.code || 'none',
  });
  const status = error?.status === 400 ? 400 : 500;
  return res.status(status).json({
    success: false,
    error: status === 400 ? 'Invalid JSON request body.' : 'Unexpected contact API error.',
  });
});

export default function contactExpressHandler(req, res) {
  app(req, res, (error) => {
    if (error) {
      console.error('Contact API handler failed:', {
        name: error?.name || 'UnknownError',
        code: error?.code || 'none',
      });
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
