// Dependencies 
// const mongoose = require('mongoose');
import * as mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

// Document Interface
type User = InferSchemaType<typeof userSchema>;
// interface User {
//   email: string;
//   password?: string;
// }

// Schema
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, }
});

// User Model
const User = mongoose.model<User & mongoose.Document>('User', userSchema);

// Export User Model
// module.exports = User;