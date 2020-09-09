import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

export const getNewChallenge = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_NEW_CHALLENGE_REQUEST,
      actionTypes.GET_NEW_CHALLENGE_SUCCESS,
      actionTypes.GET_NEW_CHALLENGE_FAILURE,
    ],
    url: urls.GET_NEW_CHALLENGE,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getAnswers = ({category}) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_ANSWERS_REQUEST,
      actionTypes.GET_ANSWERS_SUCCESS,
      actionTypes.GET_ANSWERS_FAILURE,
    ],
    url: urls.GET_ANSWERS,
    fetchOptions: {
      method: 'GET',
    },
  },
});
