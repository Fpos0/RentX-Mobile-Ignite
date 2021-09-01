import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  Container,
  InputText,
  IconContainer,
} from './styles';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

// pegando todos possiveis icons e typando p/ fazer um component geral para icones
interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: Props) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();



  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    // transforma o valor em valor logico => tem conteudo = true
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    //pega o estado que ja existe e define como o oposto dele
    setIsPasswordVisible(prevState => !prevState);
  }
  return (
    <Container isFocused={isFocused} >

      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>

      </BorderlessButton>

    </Container>
  );
}