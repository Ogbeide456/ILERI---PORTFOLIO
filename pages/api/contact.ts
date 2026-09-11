import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Contact from '../../models/Contact';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ResponseData =
  | {
      success: boolean;
      message: string;
      data?: unknown;
    }
  | {
      success: boolean;
      count?: number;
      data?: unknown;
      error?: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // GET: Retrieve all contact submissions
  if (req.method === 'GET') {
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
  }

  // POST: Create a new contact submission in MongoDB
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, name, email, message } = req.body || {};

      // Support both firstName/lastName and combined name
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
          error: 'Please provide a valid email address.',
        });
      }

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a message.',
        });
      }

      // Connect to MongoDB
      await dbConnect();

      // Create and persist document to MongoDB
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
    } catch (error: any) {
      console.error('Contact submission error:', error);
      return res.status(500).json({
        success: false,
        error: error?.message || 'An unexpected error occurred while saving to MongoDB. Please try again later.',
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed`,
  });
}

