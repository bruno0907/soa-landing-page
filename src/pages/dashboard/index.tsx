import { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router'

import { FiPower, FiCheck, FiAlertTriangle, FiX, FiList, FiMenu } from 'react-icons/fi';

import ApplyCard from '../../components/ApplyCard';

import Loader from 'react-loader-spinner';

import api from '../../services/api'

import { 
  ApplyList, 
  Container, 
  MenuBar, 
  Content, 
  Header,   
  MenuButton, 
} from '../../styles/dashboard';

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

function Dashboard(){  
  const router = useRouter()
  const [applies, setApplies] = useState<ApplyProps[]>()    
  const [appliesCount, setAppliesCount] = useState<ApplyProps[]>()  
  const [menuVisibility, setMenuVisibility] = useState(false)
  
  // const token = localStorage.getItem('@SoA-Admin:Token')
  // !token && router.push('/')  

  const getApplies = useCallback(async(approvalStatus?: string) => {
    if(approvalStatus){
      setMenuVisibility(false)
      const pendingApplications = await api.getApplies(`?status=${approvalStatus}`)
      if(!pendingApplications) return 
      const { data } = pendingApplications
      return setApplies(data)
    }
    const response = await api.getApplies()
    setMenuVisibility(false)
    
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
    // const rememberMe = localStorage.getItem('@SoA-Admin:RememberMe')

    // if(!rememberMe){
    //   localStorage.removeItem('@SoA-Admin:Token')
    // }
    return router.push('/')
  }

  const handleMenu = () => setMenuVisibility(!menuVisibility)
  
  return (
    <Container>  
      <MenuButton onClick={handleMenu}>
        { menuVisibility === false ?
          <FiMenu size={24} />
          :
          <FiX size={24} />
        }
      </MenuButton>    
      <MenuBar isOpen={menuVisibility}>  
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
      </MenuBar>
      
      <Content>
        <Header>
          <h1>Sons of Aiur Applies Dashboard</h1>
          { newAppliesCounter === 0 
            ? <span>Nenhum apply no momento</span> 
            : <span>Você possui <strong>{newAppliesCounter}</strong> {newAppliesCounter > 1 ? 'novos applies' : 'novo apply'}</span>
          }
        </Header>
        <hr/>
        <Container>
          { !applies ?    
            <Container>
              <Loader
                type="ThreeDots"
                color="#436490"
                height={100}
                width={100}      
              />            
            </Container>       
            :                
            <ApplyList>
              { applies.length <= 0 ? <Container>Nenhum apply encontrado</Container> :
              applies.map((apply: ApplyProps) =>                 
                <ApplyCard key={apply._id} apply={apply}/>  
              )}
            </ApplyList>  
          }
        </Container>
      </Content>      
    </Container>
  );
}

export default Dashboard;