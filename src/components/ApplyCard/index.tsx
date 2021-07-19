import Link from 'next/link';

import { 
  Container, 
  Card, 
  CardHeader,  
  CardBody 
} from './styles'

interface ApplyCardProps{
  apply: {    
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
    approvalStatus: string;
  }
};

const ApplyCard = ({ apply }: ApplyCardProps) => {
  return (
    <Container>
      <Link href={`/apply/${apply.name}`}>
        <Card applyStatus={apply.approvalStatus}>
          <CardHeader playerClass={apply.class}>          
            <img src={apply.avatar || "images/avatar_placeholder.png"} alt={apply.name}/>       
            <div>
              <h3>{apply.name}</h3>
              <p>{apply.battleTag}</p>
            </div>
            <span>{`${apply.ilvl || 0} ilvl`}</span>
          </CardHeader>
          <CardBody io={Math.ceil(apply.io)}>          
            <h4>{`${apply.mainSpec} ${!apply.offSpec ? '' : `/ ${apply.offSpec}`} ${apply.class}`}</h4> 
            <div>
              <p>{`${apply.raidProgression?.heroic || 0}/10H`}</p>
              <p>{`${apply.raidProgression?.mythic || 0}/10M`}</p>
              <span>{`${Math.ceil(apply.io) || 0}M+`}</span>
            </div>
          </CardBody>      
        </Card>
      </Link> 
    </Container>
  );
}

export default ApplyCard;
