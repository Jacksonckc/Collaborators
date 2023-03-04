import mongoose from 'mongoose';
import dotenv from 'dotenv';

import UserModel from '../models/UserModel.js';
import PasswordModel from '../models/Password.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

mongoose.set('strictQuery', false);

await UserModel.deleteMany();
await PasswordModel.deleteMany();

console.log('seeded');
mongoose.connection.close();
