import { InputHTMLAttributes } from 'react'
import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  name: string;
  type?: string;
  placeholder?: string;  
}

const Input: React.FC<InputProps> = ({ label, name, type, placeholder, ...rest }) =>{
  return(
    <Container>
      <label htmlFor={name}>{label}</label>
      <input 
        id={name}
        name={name}
        type={ type ? type : 'text'}
        placeholder={placeholder ? placeholder : name}  
        {...rest}               
      />
    </Container>
  )
}

export default Input