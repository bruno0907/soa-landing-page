import * as Discord from 'discord.js'

interface ApplyProps{
  _id: string;
  charName: string;
  className: string;
  mainSpec: string;
}

const { WEBHOOK_ID, WEBHOOK_TOKEN } = process.env

class DiscordNewApplyService {
  async execute({ _id, charName, className, mainSpec }: ApplyProps){

    try {
      const hook = new Discord.WebhookClient(String(WEBHOOK_ID), String(WEBHOOK_TOKEN))
      await hook.send(`@here \nVocê tem um novo apply! \n${charName} - ${className} ${mainSpec} \nhttps://soa-apply-frontend.vercel.app/apply/${_id}`)
      
    } catch (error) {
      console.log(error.message)
    }
  }
}

class DiscordNotifyApplyStatusService{
  async execute(_id: ApplyProps){
    console.log(_id)
  }
}

export {
  DiscordNewApplyService,
  DiscordNotifyApplyStatusService
}