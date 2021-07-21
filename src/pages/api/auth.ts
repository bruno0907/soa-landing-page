import { VercelRequest, VercelResponse } from '@vercel/node';
import { compare } from 'bcryptjs'

import connectToDatabase from '../../database/db';
import Admin from '../../models/Admin';

export default async function handler(req: VercelRequest, res: VercelResponse){    
  if(req.method !== 'POST') return res.status(405);

  await connectToDatabase();
  
  const { username, password } = req.body;

  if(!username || !password) return res.status(400).json({ error: 'E-mail and/or password is required!' });

  try {  
    const response = await Admin.findOne({ username });

    if(!response) return res.status(404).json({ error: 'E-mail not found!'});

    const isPasswordValid = await compare(password, response.password);

    if(!isPasswordValid) return res.status(404).json({ error: 'Invalid password!'});
  
    return res.status(202).json({ message: 'Authenticated!'}) ;   
    
  } catch (error) {
    return res.status(500).json({ error });
    
  };
};
