// Dependencies
import mongoose, { Schema, InferSchemaType } from 'mongoose';

// Document Interface
type User = InferSchemaType<typeof userSchema>;

// Schema
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  savedBadDays: { type: Array }
});

// User Model
const User = mongoose.model<User & mongoose.Document>('User', userSchema);

// Export User Model
export default User;