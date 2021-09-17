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

      const response = await hook.send(`${CHANNEL_TO_MENTION} \nVocê tem um novo apply!\n${charName} - ${className} ${mainSpec} \n${APPLY_URL}/${charName}`);

      return response    
    } catch (error) {
      throw new Error('Não foi possível enviar a mensagem')

    }    
  }
}

export {
  DiscordNewApplyService  
}
