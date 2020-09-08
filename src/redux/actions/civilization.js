import * as actionTypes from './actionTypes';
import { CALL_API } from '../middleware/api/api';
import * as urls from './urls';

export const getCivilizationsDetail = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_CIVILIZATIONS_DETAILS_REQUEST,
      actionTypes.GET_CIVILIZATIONS_DETAILS_SUCCESS,
      actionTypes.GET_CIVILIZATIONS_DETAILS_FAILURE,
    ],
    url: urls.GET_CIVILIZATIONS_DETAILS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const fightWithCivilization = () => ({
  [CALL_API]: {
    types: [
      actionTypes.FIGHT_WITH_CIVILIZATION_REQUEST,
      actionTypes.FIGHT_WITH_CIVILIZATION_SUCCESS,
      actionTypes.FIGHT_WITH_CIVILIZATION_FAILURE,
    ],
    url: urls.FIGHT_WITH_CIVILIZATION,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({}), //TODO: check body from back
    },
  },
});

export const upgradeCivilization = () => ({
  [CALL_API]: {
    types: [
      actionTypes.UPGRADE_CIVILIZATION_REQUEST,
      actionTypes.UPGRADE_CIVILIZATION_SUCCESS,
      actionTypes.UPGRADE_CIVILIZATION_FAILURE,
    ],
    url: urls.UPGRADE_CIVILIZATION,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({}),
    },
  },
});
