import { FiPower, FiCheck, FiAlertTriangle, FiX, FiList, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

import { MenuBar, MenuButton } from './styles';

type MenuProps = {
  getApplies: (status: string) => void;
  menuVisibility: boolean;
  handleMenu: () => void;
}

const Menu = ({ getApplies, menuVisibility, handleMenu }: MenuProps) => {
  const { signOut } = useAuth();  

  return (
    <>
      <MenuButton onClick={handleMenu}>
        { menuVisibility === false 
          ? <FiMenu size={24} />
          : <FiX size={24} />
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
          <button onClick={() => getApplies('')}>
          <FiList size={24}/>
            <span>Todos os applies</span>            
          </button>
        </div>
        <button onClick={signOut}>
          <FiPower size={24}/>
        </button>
      </MenuBar>
    </>
  );
};

export { Menu };
