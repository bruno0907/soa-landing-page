import mongoose from 'mongoose'

const ApplySchema = new mongoose.Schema({
  battleTag: {
    type: String,
    required: true,
  },
  charName: {
    type: String,
    required: true,
  },
  className: {
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
})

export default mongoose.models.Apply || mongoose.model('Apply', ApplySchema)