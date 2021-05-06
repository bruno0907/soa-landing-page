import Aside from "../components/Aside"
import Footer from "../components/Footer"
import ApplyForm from "../components/Form"
import Header from "../components/Header"
import { Container, Content } from "./Landing/styles"

function Home(){
  return(
    <Container>
      <Header />
      <Content>
        <Aside />
        <ApplyForm />
      </Content>
      <Footer />
    </Container>
  )
}

export default Home