import { Container } from './styles'

import { DiGithubBadge } from "react-icons/di";

const Footer = () => {  
  const currentYear = new Date().getFullYear()
  
  return (    
    <Container>
      <a href="https://github.com/bruno0907" target="_blank" rel="noopener noreferrer">
        <span>Made by</span> 
        <DiGithubBadge size={24} />
        <span>{currentYear}</span>      
      </a>
    </Container>    
  )
}

export default Footer