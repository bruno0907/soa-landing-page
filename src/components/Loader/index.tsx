import Loader from 'react-loader-spinner'

import { Container } from './styles'

export default function PageLoader(){
  return(  
    <Container>
      <Loader
        type="ThreeDots"
        color="#009ae4"
        height={100}
        width={100}      
      />
    </Container>
  )
}