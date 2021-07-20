import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { FiArrowLeft } from "react-icons/fi";

import { parseCookies } from 'nookies';

import axios from 'axios';

import useLoader from '../../hooks/useLoader';

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
} from '../../styles/apply';

interface MyApplyProps {
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
};

export default function MyApply({ name }: MyApplyProps) {
  const { Loader, isLoading, setIsLoading } = useLoader(true);

  const [apply, setApply] = useState<MyApplyProps>();
  
  useEffect(() => {
    axios.get(`/api/getApply?name=${name}`)
    .then(({ data }) => setApply(data))
    .catch(error => console.log(error.message))
    .finally(() => setIsLoading(false))    
    
    return () => setIsLoading(true);
    
  }, [setIsLoading, name]);

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
        <Head>
          <title>Sons of Aiur | Apply </title>
        </Head>
        <Container>       
          <Header status={apply.approvalStatus}>                                   
            <Link href="/">
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
            </ApplyBody>
          </ApplyContent>
        </Container>
      </>
    )
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {    
  try {
    const { '@soa.apply': name } = parseCookies(ctx);  
  
    if(!name) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    };

    return {
      props: {
        name
      }
    }
      
  } catch {
    return {
      redirect:{
        destination: '/',
        permanent: false,
      }
    }    
  }  
};
