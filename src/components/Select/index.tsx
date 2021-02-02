import { useState, SelectHTMLAttributes } from 'react'

import { MdKeyboardArrowDown,  MdKeyboardArrowUp} from 'react-icons/md'

import { Container, InputLabel, SelectField, SelectFieldValue } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  label: string;
  name: string;      
}

const Select: React.FC<SelectProps> = ({ label, name, children, value, ...rest }) => {
  const [selectArrow, setSelectArrow] = useState(false)

  const toggleSelectArrow = () => {
    setSelectArrow(!selectArrow)
  } 

  return(
    <Container>
      <InputLabel htmlFor="class">{label}</InputLabel>  
      <SelectField 
        id={name}
        name={name}
        {...rest}
        onClick={toggleSelectArrow}        
        >{children}
      </SelectField>
      <SelectFieldValue 
        value={value} 
        onChange={event => event.target.value}
        placeholder={name} 
      />        
      { selectArrow ? <MdKeyboardArrowUp size={24}/> : <MdKeyboardArrowDown size={24}/> }      
    </Container>
  )
}

export default Select