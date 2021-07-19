import { VercelRequest, VercelResponse } from '@vercel/node';

import connectToDatabase from '../../database/db';
import Apply from '../../models/Apply';

export default async function handleApply(req: VercelRequest, res: VercelResponse){  
  try {
    await connectToDatabase();
    
    const { id, approvalStatus } = req.query;

    const apply = await Apply.findById(id)

    if(!apply) throw new Error('Apply not found');

    await Apply.findByIdAndUpdate(id,
      { approvalStatus }, 
      { new: true }

    );

    return res.status(204);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  };
};
