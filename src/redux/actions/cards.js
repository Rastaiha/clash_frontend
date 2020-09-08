import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

export const getCardTypes = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_CARD_TYPES_REQUEST,
      actionTypes.GET_CARD_TYPES_SUCCESS,
      actionTypes.GET_CARD_TYPES_FAILURE,
    ],
    url: urls.GET_CARD_TYPES,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getCivilizationsCards = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_CIVILIZATIONS_CARDS_REQUEST,
      actionTypes.GET_CIVILIZATIONS_CARDS_SUCCESS,
      actionTypes.GET_CIVILIZATIONS_CARDS_FAILURE,
    ],
    url: urls.GET_CIVILIZATIONS_CARDS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getPlayerCards = () => ({
  [CALL_API]: {
    types: [
      actionTypes.PLAYER_CARDS_REQUEST,
      actionTypes.PLAYER_CARDS_SUCCESS,
      actionTypes.PLAYER_CARDS_FAILURE,
    ],
    url: urls.GET_PLAYER_CARDS,
    fetchOptions: {
      method: 'GET',
      dontContentType: false,
    },
  },
});

export const buyCard = ({ cardId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.BUY_CARD_REQUEST,
      actionTypes.BUY_CARD_SUCCESS,
      actionTypes.Buy_CARD_FAILURE,
    ],
    url: urls.BUY_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({}),
    },
  },
});

export const sellCard = ({ cardId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.SELL_CARD_REQUEST,
      actionTypes.SELL_CARD_SUCCESS,
      actionTypes.SELL_CARD_FAILURE,
    ],
    url: urls.SELL_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({}),
    },
  },
});

export const discardCard = ({ cardId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.DISCARD_CARD_REQUEST,
      actionTypes.DISCARD_CARD_SUCCESS,
      actionTypes.DISCARD_CARD_FAILURE,
    ],
    url: urls.DISCARD_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({}),
    },
  },
});

export const pickupCard = ({ cardId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.PICKUP_CARD_REQUEST,
      actionTypes.PICKUP_CARD_SUCCESS,
      actionTypes.PICKUP_CARD_FAILURE,
    ],
    url: urls.PICKUP_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({}),
    },
  },
});

export const upgradeCard = ({ cardId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.UPGRADE_CARD_REQUEST,
      actionTypes.UPGRADE_CARD_SUCCESS,
      actionTypes.UPGRADE_CARD_FAILURE,
    ],
    url: urls.UPGRADE_CARD(cardId),
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({}),
    },
  },
});
