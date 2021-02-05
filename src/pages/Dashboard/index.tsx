import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPower, FiCheck, FiAlertTriangle, FiX, } from 'react-icons/fi';

import ApplyCard from '../../components/ApplyCard';
import PageLoader from '../../components/Loader';

import avatar_placeholder from '../../assets/images/avatar_placeholder.png'

import api from '../../services/api'

import { ApplyList, 
  Container, 
  Content, 
  Header, 
  Main, 
  Sidebar 
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
  const [applicants, setApplicants] = useState<[]>()    
  
  const token = localStorage.getItem('@SoA-Admin:Token')
  !token && history.push('/')

  useEffect(() => {
    api.getApplies()
    .then(response => {      
      if(!response){
        throw new Error('No response from the server')
      }
      const { data } = response
      const { applies } = data
      setApplicants(applies)         
    })
    .catch(error => console.error(error.message))

  }, [])

  const newAppliesCounter = applicants?.length




  const logout = () => {
    const rememberMe = localStorage.getItem('@SoA-Admin:RememberMe')

    if(!rememberMe){
      localStorage.removeItem('@SoA-Admin:Token')
    }
    return history.push('/')
  }

  return (
    <Container>      
      <Sidebar>
        <header>
          <img src={avatar_placeholder} alt="" />
        </header>
        <div>
          <button onClick={() => logout()}>
            <FiAlertTriangle />
          </button>
          <button onClick={() => logout()}>
            <FiCheck />
          </button>
          <button onClick={() => logout()}>
            <FiX />
          </button>
        </div>
        <button onClick={() => logout()}>
          <FiPower />
        </button>
      </Sidebar>
      
      <Content>
        <Header>
          <h1>Sons of Aiur Applies Dashboard</h1>
          <span>Você possui {newAppliesCounter} novos applies</span>
        </Header>
        <hr/>
        <Main>
          <ApplyList>
            { !applicants ? <PageLoader /> :                
              <>
              { applicants.map((applicant: ApplyProps) =>                 
                <ApplyCard key={applicant._id} applicant={applicant}/>  
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