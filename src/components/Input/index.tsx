import { useState, InputHTMLAttributes, FormEvent } from 'react'

import { BsEyeSlash, BsEye } from 'react-icons/bs'

import { Container, InputLabel, InputField, ToggleVisibilityButton } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  name: string;
  type?: string;
  placeholder?: string;  
}

const Input: React.FC<InputProps> = ({ label, name, type, placeholder, ...rest }) =>{
  const [inputType, setInputType] = useState(type)
  const [isVisible, setIsVisible] = useState(type === 'password')

  const handleVisibility = (event: FormEvent) => {
    event.preventDefault()

    setIsVisible(!isVisible)
    setInputType(isVisible ? 'text' : 'password')
    return
  }

  return(
    <Container>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <InputField 
        id={name}
        name={name}
        type={ inputType || 'text' }
        placeholder={placeholder ? placeholder : name}  
        {...rest}               
      />
      { type === 'password' &&
        <ToggleVisibilityButton onClick={handleVisibility}>{
          inputType === 'password'
          ? <BsEye size={22} color="#436490" />
          : <BsEyeSlash size={22} color="#436490"/>
        }</ToggleVisibilityButton>        
      }

    </Container>
  )
}

export default Input