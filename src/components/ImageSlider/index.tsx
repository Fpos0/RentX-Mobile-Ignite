import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrappper,
  CarImage
} from './styles';

interface Props {
  imagesUrl: string[];
}
export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrappper>
        <CarImage
          source={{ uri: imagesUrl[0] }}
          resizeMode="contain"
        />
      </CarImageWrappper>
    </Container>
  )
}