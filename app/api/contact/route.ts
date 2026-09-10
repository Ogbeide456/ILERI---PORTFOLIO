import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET: Retrieve all submissions (for Postman testing)
export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve contact submissions.' },
      { status: 500 }
    );
  }
}

// POST: Create a new contact submission
export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload in request body.' },
        { status: 400 }
      );
    }

    const { name, email, message } = body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide an email address.' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide a message.' },
        { status: 400 }
      );
    }

    await dbConnect();

    const newSubmission = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        data: {
          id: newSubmission._id,
          name: newSubmission.name,
          email: newSubmission.email,
          message: newSubmission.message,
          createdAt: newSubmission.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your request. Please try again later.',
      },
      { status: 500 }
    );
  }
}
