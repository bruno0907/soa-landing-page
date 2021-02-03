import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPower, FiCheck, FiAlertTriangle, FiX, } from 'react-icons/fi';

import ApplyCard from '../../components/ApplyCard';
import PageLoader from '../../components/Loader';

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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.getApplies()
    .then(response => {      
      if(!response){
        setLoading(true)
        throw new Error('No response from the server')
      }
      const { data } = response
      const { applies } = data
      setApplicants(applies)
      return setLoading(false)      
    })
    .catch(error => console.error(error.message))
  }, [])

  const newAppliesCounter = applicants?.length




  const logout = () => {
    // Limpar token do localStorage
    // Limpar token do Admin no BD
    return history.push('/')
  }

  return (
    <Container>
      { loading ? <PageLoader /> : <>
          <Sidebar>
            <header>
              <div></div>
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
                <ul>
                  { applicants?.map((applicant: ApplyProps) => 
                    <Link to={`/apply/${applicant._id}`} key={applicant._id}>
                      <ApplyCard applicant={applicant}/>              
                    </Link>
                  )}
                </ul>
              </ApplyList>  
            </Main>
          </Content>
      </>}
    </Container>
  );
}

export default Dashboard;