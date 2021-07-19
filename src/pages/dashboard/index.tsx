import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import useLoader from '../../hooks/useLoader';

import ApplyCard from '../../components/ApplyCard';
import { Menu } from '../../components/Menu';

import { 
  ApplyList, 
  Container,   
  Content, 
  Header,     
} from '../../styles/dashboard';
import axios from 'axios';

interface ApplyProps{
  _id: string;
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
  about: string;
  approvalStatus: string;
}

function Dashboard(){    
  const { Loader, isLoading, setIsLoading } = useLoader(true)  

  const [applies, setApplies] = useState<ApplyProps[]>();   
  const [menuVisibility, setMenuVisibility] = useState(false);  

  const handleMenu = () => setMenuVisibility(prevVisibility => !prevVisibility)

  const getApplies = useCallback(
    async (approvalStatus?: string) => {
      // colocar isso em um try catch ou rever lógica
      if(approvalStatus){      
        handleMenu()

        const response = await fetch(`/api/getApplies?approvalStatus=${approvalStatus}`);
        if(!response) return;

        const data = await response.json();
        setApplies(data);
        return;
      };

      const response = await fetch(`/api/getApplies`);
      if(!response) return;

      const data = await response.json();
      setApplies(data);    
      handleMenu()
      return;
  }, []);

  useEffect(() => {    
    axios.get('/api/getApplies?approvalStatus=pending')
    .then(({ data }) => setApplies(data))
    .catch(error => console.log(error))
    .finally(() => setIsLoading(false))
    
    return () => setIsLoading(true);
    
  }, [setIsLoading]);
  
  return (
    <Container>    
      <Menu 
        getApplies={getApplies} 
        handleMenu={handleMenu} 
        menuVisibility={menuVisibility}
      />
      <Content>
        { isLoading ? <Loader /> : 
          <>
            <Header>
              <h1>Sons of Aiur Applies</h1>
                { !applies ? <Loader /> :              
                  applies.length === 0 
                  ? <span>Nenhum apply no momento</span> 
                  : <span>Você possui <strong>{applies.length}</strong> {applies.length > 1 ? 'novos applies' : 'novo apply'}</span>
                } 
            </Header>
            <hr/>
            <Container>
              <ApplyList>
                { !applies 
                    ? <Container>Nenhum apply encontrado</Container>
                    : applies.map((apply: ApplyProps) =>                 
                        <ApplyCard key={apply._id} apply={apply}/> 
                )}
              </ApplyList>              
            </Container>
          </>
        }
      </Content>      
    </Container>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ctx => {  
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

};
