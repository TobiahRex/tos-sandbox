import mongoose from 'mongoose';

const pricesSchema = new mongoose.Schema({
  prices: []
});

export default pricesSchema;
