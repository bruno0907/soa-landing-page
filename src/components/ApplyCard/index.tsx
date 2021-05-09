import { useEffect, useState } from 'react';
import Link from 'next/link';

import { 
  Container, 
  Card, 
  CardHeader,  
  CardBody 
} from './styles'

import useSWR from 'swr';

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

const uri = 'https://raider.io/api/v1/characters/profile'
const defaultParams = '?region=us&realm=azralon&name='
const extraInfoParams = '&fields=raid_progression%2Cmythic_plus_scores_by_season%3Acurrent%2Cgear'

const ApplyCard = ({ apply }: ApplyProps) => {  
  const [raiderIoInfo, setRaiderIoInfo] = useState<any>()
  const [ilvl, setIlvl] = useState<number>(0)
  const [progression, setProgression] = useState({
    Heroic: 0,
    Mythic: 0
  })
  const [io, setIo] = useState<number>(0)
  
  const [name,] = apply.charName.split(/(-|#)/)  

  const { error, data } = useSWR(`${uri}${defaultParams}${name}&${extraInfoParams}`)  

  useEffect(() => {
    if(error) return
    if(!data) return
    if(data.statusCode === 400) return    

    setRaiderIoInfo(data)

    setIlvl(data.gear.item_level_equipped)      
    setProgression({
      Heroic: data.raid_progression["castle-nathria"].heroic_bosses_killed,
      Mythic: data.raid_progression["castle-nathria"].mythic_bosses_killed
    })
    setIo(data.mythic_plus_scores_by_season[0].scores.all)    

  }, [error, data])


  return (           
    <> 
      { !raiderIoInfo ? (
        <Container>
          <Link href={`/apply/${apply.charName}`}>
            <Card applyStatus={apply.approvalStatus}>
              <CardHeader playerClass={apply.className} io={io}>          
                <img src="images/avatar_placeholder.png" alt=""/>       
                <div>
                  <h3>{name}</h3><p>{apply.battleTag}</p>
                </div>              
              </CardHeader>
              <CardBody>          
                <h4>{`${apply.mainSpec} ${!apply.offSpec ? '' : `/ ${apply.offSpec}`} ${apply.className}`}</h4> 
                <p>Player não possui informações no Raider.io ou Informou o nome errado.</p>                
              </CardBody>      
            </Card>
          </Link> 
        </Container>
      ) : (
        <Container>
          <Link href={`/apply/${apply.charName}`}>
            <Card applyStatus={apply.approvalStatus}>
              <CardHeader playerClass={apply.className} io={io}>          
                <img src={raiderIoInfo?.thumbnail_url || "images/avatar_placeholder.png"} alt=""/>       
                <div>
                  <h3>{name}</h3>
                  <p>{apply.battleTag}</p>
                </div>
              {!raiderIoInfo ? null :  <span>{io}</span>}
              </CardHeader>
              <CardBody>          
                <h4>
                  {`${apply.mainSpec} ${!apply.offSpec ? '' : `/ ${apply.offSpec}`} ${apply.className}
                  `}
                </h4> 
                { raiderIoInfo ? 
                  <>
                    <div>
                      <span>{` ${progression.Heroic}/10H`}</span>
                      <span>{`${progression.Mythic}/10M`}</span>
                      <span>{`${ilvl} ilvl`}</span>
                    </div>
                  </>
                  :            
                  <p>Player não possui informações no Raider.io ou Informou o nome errado.</p>
                }
              </CardBody>      
            </Card>
          </Link> 
        </Container>     
      )}
    </>     
  );
}

export default ApplyCard;
