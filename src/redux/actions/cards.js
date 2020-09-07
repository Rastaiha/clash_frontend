import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

export const getCardTypes = () => ({
  [CALL_API]: {
    types: [
      actionTypes.CARD_TYPES_REQUEST,
      actionTypes.CARD_TYPES_SUCCESS,
      actionTypes.CARD_TYPES_FAILURE,
    ],
    payload: {
      
    },
    url: urls.cardUrl,
    fetchOptions: {
      method: 'GET',
      body: JSON.stringify(),
    },
  },
});

export const getCivilCards = () => ({
  [CALL_API]: {
    types: [
      actionTypes.CIVIL_CARD_FAILURE,
      actionTypes.CIVIL_CARD_REQUEST,
      actionTypes.CIVIL_CARD_SUCCESS,
    ],
    payload: {
      
    },
    url: urls.civilCardUrl,
    fetchOptions: {
      method: 'GET',
      body: JSON.stringify(),
    },
  },
});


export const playerCard = () => ({
  [CALL_API]: {
    types: [
      actionTypes.PLAYER_CARD_REQUEST,
      actionTypes.PLAYER_CARD_SUCCESS,
      actionTypes.PLAYER_CARD_FAILURE,
    ],
    url: urls.cardUrl,
    fetchOptions: {
      method: 'GET',
      dontContentType: false,
    },
  },
});


// fixme
export const buyCard = () => ({

});
export const sellCard = () => ({});
export const discardCard = () => ({});
export const pickupCard = () => ({});
