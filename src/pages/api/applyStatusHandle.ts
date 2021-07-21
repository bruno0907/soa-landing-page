import { VercelRequest, VercelResponse } from '@vercel/node';

import connectToDatabase from '../../database/db';
import Apply from '../../models/Apply';

export default async function handleApply(req: VercelRequest, res: VercelResponse){  
  await connectToDatabase();
  
  try {    
    const { id, approvalStatus } = req.query;

    const apply = await Apply.findById(id)

    if(!apply) throw new Error('Apply not found');

    await Apply.findByIdAndUpdate(id,
      { approvalStatus }, 
      { new: true }

    );

    return res.status(204).send(true);

  } catch (error) {
    return res.status(500).json({ error })
  };
};
