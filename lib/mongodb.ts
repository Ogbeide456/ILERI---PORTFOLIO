import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Ensure environment variables from .env are loaded
dotenv.config();

/**
 * Global cache interface to maintain a cached connection across hot reloads
 * in development and across function invocations in serverless environments.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Access global cached connection safely without variable redeclaration collision
const globalWithMongoose = global as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

let cached: MongooseCache = globalWithMongoose._mongooseCache || {
  conn: null,
  promise: null,
};

if (!globalWithMongoose._mongooseCache) {
  globalWithMongoose._mongooseCache = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI (or MONGO_URI) environment variable inside .env'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
