import mongoose from 'mongoose';

const tosAccountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    default: '',
    required: true,
  },
  accessToken: {
    type: String,
    default: '',
  },
  refreshToken: {
    type: String,
    default: '',
  },
  expiresIn: {
    type: Number,
    default: 0,
  },
  refreshTokenExpiresIn: {
    type: Number,
    default: 0,
  },
  tokenType: {
    type: String,
    default: 'Bearer',
  },
});

export default tosAccountSchema;
