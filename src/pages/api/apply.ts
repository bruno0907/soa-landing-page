import { VercelRequest, VercelResponse } from '@vercel/node'

import connectToDatabase from '../../database/db'
import Apply from '../../models/Apply'
import { 
  DiscordNewApplyService 
} from '../../services/discord'

export default async function newApply(req: VercelRequest, res: VercelResponse){
  await connectToDatabase()  

  try {
    const data = {
      ...req.body,
      approvalStatus: 'pending'
    }
    const apply = await Apply.create(data)

    const { _id, charName, className, mainSpec } = apply

    const discordNotifyNewApply = new DiscordNewApplyService()

    await discordNotifyNewApply.execute({ _id, charName, className, mainSpec })

    return res.status(200).json(apply)    

  } catch (error) {
    return res.status(404).json({
        error: error.message
    })
    
  }
}