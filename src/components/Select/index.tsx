import { useState, SelectHTMLAttributes } from 'react'

import { MdKeyboardArrowDown,  MdKeyboardArrowUp} from 'react-icons/md'

import { Container } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  label: string;
  name: string;      
}

const Select: React.FC<SelectProps> = ({ label, name, children, value, ...rest }) => {
  const [selectArrow, setSelectArrow] = useState('down')

  const toggleSelectArrow = () => {
    setSelectArrow(selectArrow === 'up' ? 'down' : 'up')
  }

  return(
    <Container>
      <label htmlFor="class">{label}</label>  
      <select 
        id={name}
        name={name}
        {...rest}
        onClick={() => toggleSelectArrow()}        
        >{children}
      </select>
      <div>
        {value}
        { selectArrow === 'up' ? <MdKeyboardArrowUp size={24}/> : <MdKeyboardArrowDown size={24}/> }
      </div> 
    </Container>
  )
}

export default Select