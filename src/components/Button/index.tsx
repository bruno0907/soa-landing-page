import React, { ButtonHTMLAttributes} from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement>{
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ disabled, children, ...rest }) => {
  return <Container disabled={disabled} {...rest}>{children}</Container>;
}

export default Button;