import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

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

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const indexChanged = useRef((info: ChangeImageProps) => {
    // console.log(info);
    const index = info.viewableItems[0].index!
    setImageIndex(index);
  });
  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((_, index) => (
            <ImageIndex
              key={String(index)}
              active={index === imageIndex}
            />
          ))
        }
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CarImageWrappper>

            <CarImage
              source={{ uri: item }}
              resizeMode="contain"
            />
          </CarImageWrappper>

        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />

    </Container>
  )
}