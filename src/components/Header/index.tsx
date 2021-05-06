import Link from 'next/link'

import { Header } from './styles'

const index = () => {
  return (    
    <Header>
      <h1>SONS OF AIUR</h1>      
      <Link href="/sign-in">
        <button>
          Área Restrita
        </button>
      </Link>      
    </Header>    
  )
}

export default index