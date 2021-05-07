import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if(!MONGODB_URI) throw new Error('Please define the MONGODB_URI enviroment variables inside a .env.local')
const connection: any = {}

export default async function connectToDatabase(){
  if(connection.isConnected) return

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    return connection.isConnected = db.connections[0].readyState    
    
  } catch (error) {
    console.log(error.message)
  }
}