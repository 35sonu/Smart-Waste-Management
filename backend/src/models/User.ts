import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar?: string;
  password?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  ecoPoints: number;
  createdAt: Date;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please add a valid Indian mobile number']
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
    trim: true
  },
  avatar: {
    type: String,
    default: '👤'
  },
  password: {
    type: String,
    minlength: 6,
    select: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  ecoPoints: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get signed JWT token
userSchema.methods.getSignedJwtToken = function(): string {
  const secret = process.env.JWT_SECRET || 'fallback-secret';
  const payload = { id: this._id.toString() };
  
  return (jwt as any).sign(payload, secret, { 
    expiresIn: process.env.JWT_EXPIRE || '30d' 
  });
};

export default mongoose.model<IUser>('User', userSchema);
