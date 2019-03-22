import mongoose from 'mongoose';

const thingSchema = new mongoose.Schema({
  name: String,
});

const Things = mongoose.model('Things', thingSchema);

// -----------------------------------------------------------------------------
export default Things;
