import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

export default function URLImage(props) {
  const [image] = useImage(props.src);
  return <Image image={image} {...props} />;
}
