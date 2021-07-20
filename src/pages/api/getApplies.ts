import { VercelRequest, VercelResponse } from '@vercel/node'

import connectToDatabase from '../../database/db'
import Apply from '../../models/Apply'

export default async function handleApplies(req: VercelRequest, res: VercelResponse){
  await connectToDatabase()    
  const { approvalStatus = 'pending' } = req.query  

  try {
    const response = await Apply.find({ approvalStatus }).sort('-createdAt').exec()  
    return res.status(200).json(response)

  } catch (error) {
    return res.status(404).json({
        error: error.message
    })
    
  }
}