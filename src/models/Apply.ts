import mongoose from 'mongoose'

const ApplySchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },
  battleTag: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true
  },  
  mainSpec: {
    type: String,
    required: true,
  },
  offSpec: {
    type: String,
    required: false,
  },
  ilvl: {
    type: Number,
    required: true,
  },
  io: {
    type: Number,
    required: true,
  },
  raidProgression: {
    type: {
      heroic: Number,
      mythic: Number,
    },
    require: true,
  },
  about: {
    type: String,
    required: false,
  },   
  approvalStatus: {
    type: String,
    required: true
  }  
}, {
  timestamps: true
});

export default mongoose.models.Apply || mongoose.model('Apply', ApplySchema);
