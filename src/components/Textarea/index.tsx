import { TextareaHTMLAttributes } from 'react'
import { Container, TextareaLabel, TextareaField } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label: string;
  name: string;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, placeholder, ...rest }) => {
  return(
    <Container>
      <TextareaLabel htmlFor={name}>{label}</TextareaLabel>
      <TextareaField   
        id={name}
        name={name}          
        placeholder={placeholder ? placeholder : name}
        {...rest}
      />
    </Container>
  )
}

export default Textarea