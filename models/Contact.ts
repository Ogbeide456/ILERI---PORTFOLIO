import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: Date; 
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    match: [emailRegex, 'Please provide a valid email address'],
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact: Model<IContact> =
  (mongoose.models && mongoose.models.Contact) ||
  mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;

