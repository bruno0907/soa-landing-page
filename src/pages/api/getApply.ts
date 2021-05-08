import { VercelRequest, VercelResponse } from '@vercel/node'

import connectToDatabase from '../../database/db'
import Apply from '../../models/Apply'

export default async function handleApply(req: VercelRequest, res: VercelResponse){
  await connectToDatabase()  
  
  const { charName } = req.query

  try {
    const response = await Apply.findOne({
      charName
    })

    return res.status(200).json(response)    

  } catch (error) {
    return res.status(404).json({
        error: error.message
    })
    
  }
}