import { ReactNode, useState } from 'react'

import { MdKeyboardArrowDown } from 'react-icons/md'

import { Container } from './styles'

interface AccordionProps{
  title: String;  
  children: ReactNode
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [active, setActive] = useState(false)
  
  const handleActive = () => {
    return setActive((prevState): any => setActive(!prevState))
  }

  return(
    <Container active={active}>
      <h2 onClick={handleActive} >
        {title} <MdKeyboardArrowDown size={24}/>
      </h2>
      <div>{children}</div>
    </Container>
  )
}

export default Accordion