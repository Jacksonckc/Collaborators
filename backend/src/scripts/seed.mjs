import mongoose from 'mongoose';
import dotenv from 'dotenv';

import PasswordModel from '../models/Password.js';
import PostModel from '../models/Post.js';
import UserModel from '../models/UserModel.js';
import ProjectModel from '../models/Project.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);

mongoose.set('strictQuery', false);

await PasswordModel.deleteMany();
await PostModel.deleteMany();
await UserModel.deleteMany();
await ProjectModel.deleteMany();

console.log('seeded');
mongoose.connection.close();
