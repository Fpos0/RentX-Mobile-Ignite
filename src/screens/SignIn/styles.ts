import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1 ;
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};

`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 116}px;
`;

export const Title = styled.Text``