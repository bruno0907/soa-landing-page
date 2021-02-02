import { useEffect, useState } from 'react';

import { Container, Card, CardHeader, CardBody } from './styles'

import api from '../../services/api';

interface ApplyProps{
  applicant: {    
    battleTag: string;
    charName: string;
    className:string;
    mainSpec: string;
    offSpec: string;
    observations: string;
    approvalStatus: string;
  }
}

/*
<button>
  <a href={`https://worldofwarcraft.com/en-us/character/us/azralon/${applicant.charName}`} target="_blank" rel="noopener noreferrer">Link do armory</a>
</button>
<button>
  <a href={`https://raider.io/characters/us/azralon/${applicant.charName}`} target="_blank" rel="noopener noreferrer">Link do Raider.io</a>
</button>   

*/

const ApplyCard: React.FC<ApplyProps> = ({ applicant }) => {
  const [rioInfo, setRioInfo] = useState<any>()
  const [ilvl, setIlvl] = useState<any>()
  const [progression, setProgression] = useState({
    Heroic: 0,
    Mythic: 0
  })
  const [io, setIo] = useState<any>()

  useEffect(() => {
    api.rioInfoFetch(applicant.charName) 
    .then(({ data }) => {      
      // console.log(data.raid_progression["castle-nathria"].mythic_bosses_killed)
      setRioInfo(data)
      setIlvl(data.gear.item_level_equipped)      
      setProgression({
        Heroic: data.raid_progression["castle-nathria"].heroic_bosses_killed,
        Mythic: data.raid_progression["castle-nathria"].mythic_bosses_killed
      })
      setIo(data.mythic_plus_scores_by_season[0].scores.all)
    })
    .catch(error => console.log(error))

  }, [])

  return (            
    <Container>
      <Card applyStatus={applicant.approvalStatus}>
        <CardHeader>          
          { rioInfo !== undefined ? 
            <img src={`${rioInfo.thumbnail_url}`} alt=""/>                                                                                         
            : null
          }        
          <div>
            <h3>{applicant.charName}</h3>
            <p>{applicant.battleTag}</p>
          </div>          
        </CardHeader>
        <CardBody>          
          <p>{`${applicant.mainSpec} ${applicant.className}`} - <span>{`${ilvl}ilvl`}</span></p> 
          <p>{`Raider.io: ${io}`}</p>
          <p>{`Progressão: ${progression.Heroic}/10H - ${progression.Mythic}/10M`}</p>
        </CardBody>      
      </Card>      
    </Container>
    
  );
}

export default ApplyCard;
