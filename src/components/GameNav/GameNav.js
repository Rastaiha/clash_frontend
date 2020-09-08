import React from 'react';
import { Icon } from 'semantic-ui-react';
import BagPack from '../modals/BagPack';

export default function GameNav() {
  return (
    <div className="game-nav">
      <div className="game-nav-container">
        <div className="alarmIcon">
          <Icon name="alarm" />
        </div>
        <div className="rastakhiz">
          <img src={process.env.PUBLIC_URL + '/images/rastakhiz.png'} />
        </div>
        <BagPack
          trigger={
            <div className="bagpack">
              <img src={process.env.PUBLIC_URL + '/images/bagpack.png'} />
            </div>
          }
        />
      </div>
    </div>
  );
}
