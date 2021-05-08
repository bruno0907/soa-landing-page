import Spinner from 'react-loader-spinner'
import { Container } from './styles'

export default function Loader(){
  return(  
    <Container>
      <Spinner
        type="ThreeDots"
        color="#436490"
        height={100}
        width={100}      
      />    
    </Container>    
  )
}