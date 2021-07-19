import { VercelRequest, VercelResponse } from '@vercel/node';

import connectToDatabase from '../../database/db';
import Apply from '../../models/Apply';

export default async function handleApply(req: VercelRequest, res: VercelResponse){
  try {
    await connectToDatabase();
    
    const { id } = req.query;
    const apply = await Apply.findByIdAndRemove(id);
    
    if(!apply) throw Error('Apply not found');
    
    return res.status(200).json({ status: true });    
  } catch (error) {
    throw Error(error.message)
  }
  
};

