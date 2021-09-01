import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  Container,
  InputText,
  IconContainer
} from './styles';
import { useTheme } from 'styled-components';

// pegando todos possiveis icons e typando p/ fazer um component geral para icones
interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

// * onblur = quando desceleciona a caioxa ||||||

export function Input({
  iconName,
  value,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    // transforma o valor em valor logico => tem conteudo = true
    setIsFilled(!!value);
  }
  const theme = useTheme();
  return (
    <Container>

      <IconContainer isFocused={isFocused} >
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}

        />
      </IconContainer>
      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
}