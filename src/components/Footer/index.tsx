import { Container } from './styles'

import { DiGithubBadge } from "react-icons/di";

const Footer = () => {  
  const currentYear = new Date().getFullYear()
  
  return (    
    <Container>
      <span>Made by</span> - 
      <a href="https://github.com/bruno0907" target="_blank" rel="noopener noreferrer">
        <DiGithubBadge size={24} />
      </a>
      <span> - {currentYear}</span>      
    </Container>    
  )
}

export default Footer