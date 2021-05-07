import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if(!MONGODB_URI) throw new Error('Please define the MONGODB_URI enviroment variables inside a .env.local')
const connection: any = {}

export default async function connectToDatabase(){
  if(connection.isConnected) return

  try {
    const db = await mongoose.connect(String(MONGODB_URI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    return connection.isConnected = db.connections[0].readyState    
    
  } catch (error) {
    console.log(error.message)
  }
}