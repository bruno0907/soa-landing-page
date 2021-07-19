import { VercelRequest, VercelResponse } from '@vercel/node';

import axios from 'axios';

import connectToDatabase from '../../database/db';
import Apply from '../../models/Apply';

import { DiscordNewApplyService } from '../../services/discord';

const api = axios.create({
  baseURL : 'https://raider.io/api/v1/characters/profile'
});

const defaultParams = '?region=us&realm=azralon&name=';
const extraInfoParams = '&fields=raid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cgear';

interface ApplyProps {  
  avatar: string;  
  battleTag: string;
  name: string;
  class: string;
  mainSpec: string;
  offSpec: string;
  ilvl: number;
  raidProgression: {    
    heroic: number,
    mythic: number    
  };
  io: number;
  about: string;
  approvalStatus: string;
}

export default async function handleApplies(req: VercelRequest, res: VercelResponse){  
  try {
    await connectToDatabase();

    const { 
      battleTag,
      charName,
      className,
      mainSpec,
      offSpec,
      about,
    } = req.body

    const rioResponse = await api.get(`${defaultParams}${charName}&${extraInfoParams}`);
      
    if(!rioResponse.data) throw Error('Error fetching Raider.io information');

    const data: ApplyProps = {      
      avatar: rioResponse.data.thumbnail_url,
      name: charName,
      class: className,
      mainSpec: mainSpec,
      offSpec: offSpec,
      battleTag: battleTag,
      raidProgression: {
        heroic: rioResponse.data.raid_progression['sanctum-of-domination'].heroic_bosses_killed,
        mythic: rioResponse.data.raid_progression['sanctum-of-domination'].mythic_bosses_killed
      },
      ilvl: rioResponse.data.gear.item_level_equipped,
      io: rioResponse.data.mythic_plus_scores_by_season[0].scores.all,
      about: about,      
      approvalStatus: 'pending'
    };

    const apply = await Apply.create<ApplyProps>(data);

    const { _id, } = apply;

    const discordNotifyNewApply = new DiscordNewApplyService();

    await discordNotifyNewApply.execute({ _id, charName, className, mainSpec });

    return res.status(201).json(apply);

  } catch (error) {
    return res.status(404).json({
        error: error.message
    });
  };
};
