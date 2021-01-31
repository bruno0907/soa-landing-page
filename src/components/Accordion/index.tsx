import { useState } from 'react'

import { MdKeyboardArrowDown,  MdKeyboardArrowUp} from 'react-icons/md'

import { Card, CardTitle, CardBody } from './styles'

interface AccordionProps{
  title: String;
  body: String;  
}

const Accordion = ({ title, body }: AccordionProps) => {
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
        {body.split('\n').map(str => <p key={Math.random()}>{str}</p>)}
      </CardBody>
    </Card>
  )
}

export default Accordion