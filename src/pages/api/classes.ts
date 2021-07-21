import { VercelRequest, VercelResponse } from '@vercel/node';

import connectToDatabase from '../../database/db';
import Classes from '../../models/Classes';

export default async function handler(req: VercelRequest, res: VercelResponse){  
  await connectToDatabase();

  try {
    const response = await Classes.find();
  
    return res.status(200).json(response);
    
  } catch (error) {
    return res.status(404).json({
      error: error.message
    });
    
  }
}