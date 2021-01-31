import { TextareaHTMLAttributes } from 'react'
import { Container } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label: string;
  name: string;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, placeholder, ...rest }) => {
  return(
    <Container>
      <label htmlFor={name}>{label}</label>
      <textarea   
        id={name}
        name={name}          
        placeholder={placeholder ? placeholder : name}
        {...rest}
      />
    </Container>
  )
}

export default Textarea