import { InputHTMLAttributes, useMemo } from 'react'

import { MdKeyboardArrowUp } from 'react-icons/md'
import useVisible from '../../hooks/useVisible'

import { Container } from './styles'

interface SelectProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  name: string;     
}

const Select: React.FC<SelectProps> = ({ label, name, children, value, ...rest }) => {
  const { componentRef, isVisible, setIsVisible } = useVisible(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  useMemo(() => {
    value !== '' && setIsVisible(false)

  }, [value, setIsVisible])

  return(
    <Container 
      isVisible={isVisible}
      onClick={toggleVisibility} 
      >
      <label htmlFor={name}>{label}</label>
      <input 
        type="text" 
        name={name}
        value={value} 
        onChange={event => event.target.value}        
        placeholder={label}             
        ref={componentRef}                          
      />        
        <ul>          
          {children}
        </ul>        
      <MdKeyboardArrowUp size={24}/>
    </Container>
  )
}

export default Select