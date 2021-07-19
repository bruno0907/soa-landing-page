import * as Discord from 'discord.js'

interface ApplyProps{
  _id: string;
  charName: string;
  className: string;
  mainSpec: string;
}

const { WEBHOOK_ID, WEBHOOK_TOKEN, APPLY_URL, CHANNEL_TO_MENTION } = process.env

class DiscordNewApplyService {
  async execute({ charName, className, mainSpec }: ApplyProps){
    try {
      const hook = new Discord.WebhookClient(String(WEBHOOK_ID), String(WEBHOOK_TOKEN));
      await hook.send(`${CHANNEL_TO_MENTION} \nVocê tem um novo apply!\n${charName} - ${className} ${mainSpec} \n${APPLY_URL}/${charName}`);
      return      
    } catch (error) {
      console.log(error.message);
      return
    }    
  }
}

class DiscordNotifyApplyStatusService{
  async execute(_id: ApplyProps){
    console.log(_id)
    return
  }
}

export {
  DiscordNewApplyService,
  DiscordNotifyApplyStatusService
}