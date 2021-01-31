import { Link } from 'react-router-dom'

import { Header } from './styles'

const index = () => {
  return (    
    <Header>
      <h1>SONS OF AIUR</h1>      
      <Link to="/sign-in">
        <button>
          Sign-In
        </button>
      </Link>      
    </Header>    
  )
}

export default index