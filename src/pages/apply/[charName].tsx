import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import { useRouter } from 'next/router'

import useSWR from 'swr';
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

import api from '../../services/api';

import { getRaiderIoInfo } from '../../services/getRaiderIoService'

interface ApplyProps{
  _id: string;
  battleTag: string;
  charName: string;
  className: string;
  mainSpec: string;
  offSpec: string;
  about: string;
  approvalStatus: string;
}

const Apply = () => {
  const router = useRouter()  
  const { charName: name } = router.query

  const { error, data } = useSWR(`/api/getApply?charName=${name}`)

  const [applyInfo, setApplyInfo] = useState<ApplyProps>()
  const [playerInfo, setPlayerInfo] = useState<any>()
  const { Loader, isLoading, setIsLoading } = useLoader(true)

  useEffect(() => {
    const getApply = async() => {
      if(error) return
      if(!data) return

      const [charName,] = data.charName.split(/[^a-zA-Z/g]/)
      const apply = {
        ...data,
        charName
      }
      setApplyInfo(apply)
    }
    getApply()

    return () => setIsLoading(true)

  }, [error, data, setIsLoading])   

  useEffect(() => {
    if(!applyInfo) return 

    getRaiderIoInfo(applyInfo.charName).then(response => {      
      setPlayerInfo(response)
      setIsLoading(false)

    }).catch(error => {
      console.log(error)
      setIsLoading(false)
      return

    })    
  }, [applyInfo, setIsLoading])

  const handleApplyStatus = (status: string) =>{
    if(!applyInfo) return

    setIsLoading(true)
    
    api.applyStatusHandle(applyInfo._id, applyInfo?.approvalStatus)
      .then(() => router.push('/dashboard'))
      .catch(error => console.log(error.message))
  }

  const handleRemoveApply = () =>{
    if(!applyInfo) return

    setIsLoading(true)
    api.applyRemove(applyInfo._id)
      .then(() => router.push('/dashboard'))
      .catch(error => console.log(error.message))
  }

  return (    
    <>
      <Head>
        <title>{`Sons of Aiur | ${applyInfo?.charName} apply`}</title>        
        <meta name="description" content={applyInfo?.charName}/>       
        <meta name="description" content={applyInfo?.className}/>       
        <meta name="description" content={applyInfo?.mainSpec}/>       
      </Head>
      <Container>      
        { isLoading === true ? <Loader /> : 
          <>                    
            <Header status={applyInfo?.approvalStatus || ''}>
              <Link href="/dashboard">
                <button><FiArrowLeft size={24} /></button>
              </Link>
              <h1>Apply {applyInfo?.charName}</h1>
              <span> 
                {applyInfo?.approvalStatus === 'pending' && 'Pendente'}
                {applyInfo?.approvalStatus === 'approved' && 'Aprovado'}
                {applyInfo?.approvalStatus === 'rejected' && 'Recusado'}
              </span>              
            </Header>
            <ApplyContent>
              
              <ApplyHeader playerClass={applyInfo?.className}>
                <img src={playerInfo?.thumbnail_url} alt=""/>
                
                <ApplyInfo playerClass={applyInfo?.className}>
                  <h2>{applyInfo?.charName}</h2>
                  <span>{applyInfo?.battleTag}</span>  
                  <p>{`
                    ${applyInfo?.mainSpec} ${applyInfo?.offSpec !== '' && ` / ${applyInfo?.offSpec}`} ${applyInfo?.className} -
                    ${playerInfo?.gear.item_level_equipped} ilvl
                    `}
                  </p>              
                </ApplyInfo>
                <ScoreIoBox io={playerInfo?.mythic_plus_scores_by_season[0].scores.all}>
                  <span>Best Mythic+</span>
                  <p>{playerInfo?.mythic_plus_scores_by_season[0].scores.all}</p>                  
                </ScoreIoBox>                
              </ApplyHeader>
              
              <ApplyBody>                
                <ProgressionSection>
                  <h3>Progressão Castle Nathria</h3>
                  <div>
                    <ProgressionBox>                    
                      {playerInfo?.raid_progression["castle-nathria"].mythic_bosses_killed}/10M                 
                    </ProgressionBox>
                    <ProgressionBox>
                      {playerInfo?.raid_progression["castle-nathria"].heroic_bosses_killed}/10H
                    </ProgressionBox>
                  </div>                  
                </ProgressionSection>
                
                <PlayerAbout>
                  <h3>Informações adicionais</h3>
                  <p>{applyInfo?.about}</p>
                </PlayerAbout>
                
                <LinksSection>
                  <h3>Links</h3>
                  <div>
                    <a href={`https://www.warcraftlogs.com/character/us/azralon/${applyInfo?.charName}`} target="_blank" rel="noopener noreferrer">Logs</a>
                    <a href={`http://worldofwarcraft.com/en-us/character/us/azralon/${applyInfo?.charName}`} target="_blank" rel="noopener noreferrer">Armory</a>
                    <a href={`http://www.wowprogress.com/character/us/azralon/${applyInfo?.charName}`} target="_blank" rel="noopener noreferrer">Wowprogress</a>
                    <a href={`https://raider.io/characters/us/azralon/${applyInfo?.charName}`} target="_blank" rel="noopener noreferrer">Raider.io</a> 
                  </div>
                </LinksSection>

                <ButtonSection>  
                  { applyInfo?.approvalStatus === 'pending' && 
                    <>
                      <RejectButton type="button" onClick={() => handleApplyStatus('rejected')}>
                        <FiX size={24} />
                        Rejeitar Apply
                      </RejectButton>
                      <ApproveButton type="button"onClick={() => handleApplyStatus('approved')}>
                        <FiCheck size={24} />
                        Aprovar Apply
                      </ApproveButton>
                    </>
                  }  
                  { applyInfo?.approvalStatus === 'rejected' && 
                    <ReOpenButton type="button"onClick={() => handleApplyStatus('pending')}>
                      <FiCheck size={24} />
                      Reabrir Apply
                    </ReOpenButton>
                  }   
                  </ButtonSection>
              </ApplyBody>

            </ApplyContent>
            <DeleteApplyButton onClick={handleRemoveApply}>Excluir Apply</DeleteApplyButton>
          </>
        }
      </Container>
    </>
    
  );
}

export default Apply;