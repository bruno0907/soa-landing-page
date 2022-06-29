import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import { parseCookies } from 'nookies';

import useLoader from '../../hooks/useLoader';

import { FiArrowLeft, FiCheck, FiX } from "react-icons/fi";

import { Container, 
  Header, 
  ApplyContent,
  ApplyHeader,
  ApplyInfo,
  ScoreIoBox,
  ApplyBody,
  ProgressionSection,
  ProgressionBox,
  PlayerAbout,
  LinksSection,
  ButtonSection,
  ApproveButton,
  RejectButton,
  ReOpenButton,
  DeleteApplyButton,
} from '../../styles/apply';

import axios from 'axios';

interface ApplyProps {
  _id: string;
  avatar: string;  
  battleTag: string;
  name: string;
  class: string;
  mainSpec: string;
  offSpec: string;
  ilvl: number;
  raidProgression: {    
    heroic: number;
    mythic: number;    
  };
  io: number;
  about: string;
  approvalStatus: string;
}

const Apply = () => {
  const router = useRouter();
  const { name } = router.query;

  const { Loader, isLoading, setIsLoading } = useLoader(true);

  const [apply, setApply] = useState<ApplyProps>();

  const handleApplyStatus = (id: string, status: string) => {
    setIsLoading(true);

    axios.post(`/api/applyStatusHandle?id=${id}&approvalStatus=${status}`)
      .then(() => router.push('/dashboard'))
      .catch(error => console.log(error.message))
      .finally(() => setIsLoading(false))
  }

  const handleRemoveApply = (id: string) => {
    setIsLoading(true);

    axios.delete(`/api/removeApply?id=${id}`)
      .then(() => router.push('/dashboard'))
      .catch(error => console.log(error.message))
      .finally(() => setIsLoading(false))
  }
  
  useEffect(() => {
    axios.get(`/api/getApply?name=${name}`)
      .then(({ data }) => setApply(data))
      .catch(error => console.log(error.message))
      .finally(() => setIsLoading(false))    
    
  }, [name, setIsLoading]);

  return (
    isLoading ? (
      <Container>
        <Loader />
      </Container>
    ) : !apply ? (      
      <Container>
        <h3>Apply não encontrado</h3>
      </Container>
    ) : (
      <>
        <Container>       
          <Header status={apply.approvalStatus}>
            <Link href="/dashboard">
              <button><FiArrowLeft size={24} /></button>
            </Link>
            <h1>Apply {apply.name}</h1>
            <span> 
              {apply.approvalStatus === 'pending' && 'Pendente'}
              {apply.approvalStatus === 'approved' && 'Aprovado'}
              {apply.approvalStatus === 'rejected' && 'Recusado'}
            </span>              
          </Header>
          <ApplyContent>
            
            <ApplyHeader playerClass={apply.class}>
              <img src={apply.avatar || ''} alt={apply.name}/>
              
              <ApplyInfo playerClass={apply.class}>
                <h2>{apply.name}</h2>
                <span>{apply.battleTag}</span>  
                <p>
                  {`${apply.mainSpec} ${apply.offSpec} ${apply.class} - ${apply.ilvl}ilvl`}
                </p>              
              </ApplyInfo>
              <ScoreIoBox io={apply.io}>
                <span>Best Mythic+</span>
                <p>{apply.io}</p>                  
              </ScoreIoBox>                
            </ApplyHeader>
            
            <ApplyBody>                
              <ProgressionSection>
                <h3>Progressão Sanctum of Domination</h3>
                <div>
                  <ProgressionBox>{apply.raidProgression.mythic}/10M</ProgressionBox>
                  <ProgressionBox>{apply.raidProgression.heroic}/10H</ProgressionBox>
                </div>                  
              </ProgressionSection>
              
              <PlayerAbout>
                <h3>Informações adicionais</h3>
                <p>{apply.about}</p>
              </PlayerAbout>
              
              <LinksSection>
                <h3>Links</h3>
                <div>
                  <a href={`https://www.warcraftlogs.com/character/us/azralon/${apply.name}`} target="_blank" rel="noopener noreferrer">Logs</a>
                  <a href={`http://worldofwarcraft.com/en-us/character/us/azralon/${apply.name}`} target="_blank" rel="noopener noreferrer">Armory</a>
                  <a href={`http://www.wowprogress.com/character/us/azralon/${apply.name}`} target="_blank" rel="noopener noreferrer">Wowprogress</a>
                  <a href={`https://raider.io/characters/us/azralon/${apply.name}`} target="_blank" rel="noopener noreferrer">Raider.io</a> 
                </div>
              </LinksSection>

              <ButtonSection>  
                { apply.approvalStatus === 'pending' && 
                  <>
                    <RejectButton type="button" onClick={() => handleApplyStatus(apply._id, 'rejected')}>
                      <FiX size={24} />
                      Rejeitar Apply
                    </RejectButton>
                    <ApproveButton type="button"onClick={() => handleApplyStatus(apply._id, 'approved')}>
                      <FiCheck size={24} />
                      Aprovar Apply
                    </ApproveButton>
                  </>
                }  
                { apply.approvalStatus === 'rejected' && 
                  <ReOpenButton type="button"onClick={() => handleApplyStatus(apply._id, 'pending')}>
                    <FiCheck size={24} />
                    Reabrir Apply
                  </ReOpenButton>
                }   
                </ButtonSection>
            </ApplyBody>

          </ApplyContent>
          <DeleteApplyButton isDisabled>Excluir Apply</DeleteApplyButton>          
        </Container>   
      </>
    )
  );
};

export default Apply;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);  

  if(!cookies['@soa.user']) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  };      
 
  return {
    props: {}
  }
}
