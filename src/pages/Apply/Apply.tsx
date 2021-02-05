import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

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
  DeleteApplyButton

} from './styles';
import api from '../../services/api';
import PageLoader from '../../components/Loader';

interface ApplyProps{
  id: string;
  battleTag: string;
  charName: string;
  className: string;
  mainSpec: string;
  offSpec: string;
  about: string;
  approvalStatus: string;
}

const Apply: React.FC<ApplyProps> = () => {
  const { id } = useParams<ApplyProps>()  
  const history = useHistory()
  const [applyInfo, setApplyInfo] = useState<ApplyProps>()
  const [playerInfo, setPlayerInfo] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getApplyData = (async() => {
      const response = await api.getApply(id)
      if(!response){
        setLoading(false)
        return
      }

      const { data } = response     
      const { apply } = data
      setApplyInfo(apply)  
      return 
    })
    getApplyData()  

    const playerName = applyInfo?.charName
  
    const getRaiderIoInfo = async(playerName: string) => {      
      const response = await api.getRaiderioInfo(playerName)      
      if(!response){
        setLoading(false)
        return
      }      
  
      const { data } = response  
      
      setPlayerInfo(data)
    }    
    
    if(!playerName) return  
    getRaiderIoInfo(playerName)
    setLoading(false)

  }, [id, applyInfo?.charName])

  const handleApplyStatus = (status: string) =>{
    setLoading(true)
    api.applyStatusHandle(id, status)
      .then(() => history.push('/dashboard'))
      .catch(error => console.log(error.message))
  }

  const handleRemoveApply = () =>{
    setLoading(true)
    api.applyRemove(id)
      .then(() => history.push('/dashboard'))
      .catch(error => console.log(error.message))
  }

  return (    
    <Container>      
      { loading === true
        ? <PageLoader />
        : <>            
            <Header status={applyInfo?.approvalStatus || ''}>
              <Link to="/dashboard">
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
                  <RejectButton type="button" onClick={() => handleApplyStatus('rejected')}>
                    <FiX size={24} />
                    Rejeitar Apply
                  </RejectButton>
                  <ApproveButton type="button"onClick={() => handleApplyStatus('approved')}>
                    <FiCheck size={24} />
                    Aprovar Apply
                  </ApproveButton>
                </ButtonSection>
              </ApplyBody>

            </ApplyContent>
            <DeleteApplyButton onClick={handleRemoveApply}>Excluir Apply</DeleteApplyButton>
          </>
        }
    </Container>
    
  );
}

export default Apply;