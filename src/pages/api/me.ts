import { VercelRequest, VercelResponse } from '@vercel/node';

import connectToDatabase from '../../database/db';
import Admin from '../../models/Admin';

export default async function handler(req: VercelRequest, res: VercelResponse){
  await connectToDatabase();

  const { email } = req.body;
  try {
    const user = await Admin.find({ email });
    
    if(!user) {      
      return res.status(404).json({ error: 'E-mail not found!' });
    };

    return res.status(202).json({ message: 'Authenticated!'}) ;   
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
    
  };
};
