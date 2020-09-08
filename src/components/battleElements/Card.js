import React from 'react';
import { Image } from 'semantic-ui-react';

export default function Card({
  isOurCards = false,
  offset = 0,
  src = process.env.PUBLIC_URL + '/images/cards/back.jpg',
}) {
  return (
    <div
      className={isOurCards ? 'card-item our-card' : 'card-item'}
      style={{
        transform: `rotate(${offset * 20}deg)`,
      }}
    >
      <Image src={src} />
    </div>
  );
}
