import React, { ButtonHTMLAttributes} from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement>{
  disabled?: boolean;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ disabled, label, ...rest }) => {
  return <Container disabled={disabled} {...rest}>{label}</Container>;
}

export default Button;