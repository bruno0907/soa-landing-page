import { ReactNode, useState } from 'react'

import { MdKeyboardArrowDown,  MdKeyboardArrowUp} from 'react-icons/md'

import { Card, CardTitle, CardBody } from './styles'

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
    <Card>
      <CardTitle onClick={handleActive}>
        {title}
        { active === false 
          ? <MdKeyboardArrowDown size={24}/>
          : <MdKeyboardArrowUp size={24}/>
        }
      </CardTitle>
      <CardBody active={active}>
        {/* {body.split('\n').map(str => <p key={Math.random()}>{str}</p>)} */}
        {children}
      </CardBody>
    </Card>
  )
}

export default Accordion