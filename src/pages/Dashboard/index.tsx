import React, { useState, useEffect, useCallback } from 'react';

import { useHistory, Link } from 'react-router-dom';

import { FiPower, FiCheck, FiAlertTriangle, FiX, FiList } from 'react-icons/fi';

import ApplyCard from '../../components/ApplyCard';
import PageLoader from '../../components/Loader';

import avatar_placeholder from '../../assets/images/avatar_placeholder.png'

import api from '../../services/api'

import { ApplyList, 
  Container, 
  HeaderBar, 
  Content, 
  Header, 
  Main, 
} from './styles';

interface ApplyProps{
  _id: string;
  battleTag: string;
  charName: string;
  className:string;
  mainSpec: string;
  offSpec: string;
  observations: string;
  approvalStatus: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory()  
  const [applies, setApplies] = useState<ApplyProps[]>()    
  const [appliesCount, setAppliesCount] = useState<ApplyProps[]>()  
  
  const token = localStorage.getItem('@SoA-Admin:Token')
  !token && history.push('/')  

  const getApplies = useCallback(async(approvalStatus?: string) => {
    if(approvalStatus){
      const pendingApplications = await api.getApplies(`?status=${approvalStatus}`)
      if(!pendingApplications) return 
      const { data } = pendingApplications
      return setApplies(data)
    }
    const response = await api.getApplies()

    if(!response) return

    const { data } = response
    setApplies(data.applies)    
    setAppliesCount(data.applies)
  }, [])
  
  useEffect(() => {
    getApplies()    

  }, [getApplies])

  const newAppliesCounter = appliesCount?.filter(apply => apply.approvalStatus === 'pending').length || 0

  const logout = () => {
    const rememberMe = localStorage.getItem('@SoA-Admin:RememberMe')

    if(!rememberMe){
      localStorage.removeItem('@SoA-Admin:Token')
    }
    return history.push('/')
  }

  return (
    <Container>      
      <HeaderBar>        
        <Link to="/">
          <img src={avatar_placeholder} alt="" />
        </Link>        
        <div>
          <button onClick={() => getApplies('pending')}>
            <FiAlertTriangle size={24}/>
            <span>Applies pendentes</span>
          </button>
          <button onClick={() => getApplies('approved')}>
            <FiCheck size={24} />
            <span>Applies aprovados</span>
          </button>
          <button onClick={() => getApplies('rejected')}>
            <FiX size={24}/> 
            <span>Applies rejeitados</span>
          </button>
          <button onClick={() => getApplies()}>
          <FiList size={24}/>
            <span>Todos os applies</span>            
          </button>
        </div>
        <button onClick={() => logout()}>
          <FiPower size={24}/>
        </button>
      </HeaderBar>
      
      <Content>
        <Header>
          <h1>Sons of Aiur Applies Dashboard</h1>
          { newAppliesCounter === 0 
            ? <span>Nenhum apply no momento</span> 
            : <span>Você possui <strong>{newAppliesCounter}</strong> {newAppliesCounter > 1 ? 'novos applies' : 'novo apply'}</span>
          }
        </Header>
        <hr/>
        <Main>
          <ApplyList>
            { !applies ? <PageLoader /> :                
              <>
              { applies.length <= 0 ? <Container>Nenhum apply encontrado</Container> :
              applies.map((apply: ApplyProps) =>                 
                <ApplyCard key={apply._id} apply={apply}/>  
              )}
              </>
            }
          </ApplyList>  
        </Main>
      </Content>      
    </Container>
  );
}

export default Dashboard;