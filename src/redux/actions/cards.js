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
    url: urls.cardTypeUrl,
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

export const buyCard = (cardId) => ({
  [CALL_API]: {
    types: [
      actionTypes.BUY_CARD_REQUEST,
      actionTypes.BUY_CARD_SUCCESS,
      actionTypes.Buy_CARD_FAILURE,
    ],
    url: urls.BUY_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      dontContentType: false,
    },
  },
});

export const sellCard = (cardId) => ({
  [CALL_API]: {
    types: [
      actionTypes.SELL_CARD_REQUEST,
      actionTypes.SELL_CARD_SUCCESS,
      actionTypes.SELL_CARD_FAILURE,
    ],
    url: urls.SELL_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      dontContentType: false,
    },
  },
});

export const discardCard = (cardId) => ({
  [CALL_API]: {
    types: [
      actionTypes.DISCARD_CARD_REQUEST,
      actionTypes.DISCARD_CARD_SUCCESS,
      actionTypes.DISCARD_CARD_FAILURE,
    ],
    url: urls.DISCARD_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      dontContentType: false,
    },
  },
});

export const pickupCard = (cardId) => ({
  [CALL_API]: {
    types: [
      actionTypes.PICKUP_CARD_REQUEST,
      actionTypes.PICKUP_CARD_SUCCESS,
      actionTypes.PICKUP_CARD_FAILURE,
    ],
    url: urls.PICKUP_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      dontContentType: false,
    },
  },
});
