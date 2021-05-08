import { useEffect, useState } from 'react';
import Link from 'next/link';

import { 
  Container, 
  Card, 
  CardHeader,  
  CardBody 
} from './styles'

import { getRaiderIoInfo } from '../../services/getRaiderIoService'

interface ApplyProps{
  apply: {    
    _id: string;
    battleTag: string;
    charName: string;
    className:string;
    mainSpec: string;
    offSpec: string;
    observations: string;
    approvalStatus: string;
  }
}

const ApplyCard = ({ apply }: ApplyProps) => {
  const [raiderioInfo, setRaiderioInfo] = useState<any>()
  const [ilvl, setIlvl] = useState<any>()
  const [progression, setProgression] = useState({
    Heroic: 0,
    Mythic: 0
  })
  const [io, setIo] = useState<any>()
  
  const [playerName,] = apply.charName.split(/(-|#)/)

  useEffect(() => {
    getRaiderIoInfo(playerName) 
    .then(response => {        
      if(response.statusCode === 400) return
      
      setRaiderioInfo(response)
      setIlvl(response.gear.item_level_equipped)      
      setProgression({
        Heroic: response.raid_progression["castle-nathria"].heroic_bosses_killed,
        Mythic: response.raid_progression["castle-nathria"].mythic_bosses_killed
      })
      setIo(response.mythic_plus_scores_by_season[0].scores.all)
    })
    .catch(error => console.log(error))

  }, [playerName])


  return (            
    <Container>
      <Link href={`/apply/${apply.charName}`}>
        <Card applyStatus={apply.approvalStatus}>
          <CardHeader 
            playerClass={apply.className} 
            io={io}
          >          
            <img src={raiderioInfo?.thumbnail_url || "images/avatar_placeholder.png"} alt=""/>       
            <div>
              <h3>{playerName}</h3>
              <p>{apply.battleTag}</p>
            </div>
           {!raiderioInfo ? null :  <span>{io}</span>}
          </CardHeader>
          <CardBody>          
            <h4>
              {`
                ${apply.mainSpec} 
                ${!apply.offSpec ? '' : `/ ${apply.offSpec}`} ${apply.className}
              `}
            </h4> 
            { raiderioInfo ? 
              <>
                <div>
                  <span>{` ${progression.Heroic || '0'}/10H`}</span>
                  <span>{`${progression.Mythic || '0'}/10M`}</span>
                  <span>{`${ilvl || '0' } ilvl`}</span>
                </div>
              </>
              :            
              <p>Player não possui informações no Raider.io ou Informou o nome errado.</p>
            }
          </CardBody>      
        </Card>
      </Link> 
    </Container>       
  );
}

export default ApplyCard;
