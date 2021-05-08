import Aside from "../components/Aside"
import Footer from "../components/Footer"
import ApplyForm from "../components/ApplyForm"
import Header from "../components/Header"
import About from '../components/About'

import { Container, Content, Main, Info } from "../styles/landing"

export default function Home(){  
  return(
    <Container>
      <Header />
      <Content>
        <Main>
          <Aside />
          <ApplyForm />
        </Main>
        <h2>Sobre a Sons of Aiur</h2>
        <Info>
          <About />
        </Info>
      </Content>
      <Footer />
    </Container>
  )
}
