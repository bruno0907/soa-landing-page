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

  useEffect(() => {
    api.rioInfoFetch(applicant.charName) 
    .then(({ data }) => {
      setRioInfo(data)      
    })
    .catch(error => console.log(error))
  })

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
          <p>{`${applicant.mainSpec} ${applicant.className}`}</p> 
        </CardBody>      
      </Card>      
    </Container>
    
  );
}

export default ApplyCard;
