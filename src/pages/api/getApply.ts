import { VercelRequest, VercelResponse } from '@vercel/node';

import connectToDatabase from '../../database/db';
import Apply from '../../models/Apply';

export default async function handleApply(req: VercelRequest, res: VercelResponse){
  await connectToDatabase();
  
  const { name } = req.query;  

  try {
    const apply = await Apply.findOne({ name });

    if(!apply) throw new Error('Apply not found');    

    return res.status(200).json(apply);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  };
};
