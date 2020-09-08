import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';
import getFormData from '../../utils/jsonToFormData';

export const getAnswer = ({ filename, category, challengId }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_ANSWER_REQUEST,
      actionTypes.GET_ANSWER_SUCCESS,
      actionTypes.GET_ANSWER_FAILURE,
    ],
    url:
      urls.GET_ANSWER +
      (filename ? filename : category + '/' + challengId) +
      '/',
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getQuestion = ({ filename, category }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_QUESTION_REQUEST,
      actionTypes.GET_QUESTION_SUCCESS,
      actionTypes.GET_QUESTION_FAILURE,
    ],
    url: urls.GET_QUESTION + category + '/' + filename + '/',
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const sendAnswer = ({ file }) => ({
  [CALL_API]: {
    types: [
      actionTypes.UPLOAD_ANSWER_REQUEST,
      actionTypes.UPLOAD_ANSWER_SUCCESS,
      actionTypes.UPLOAD_ANSWER_FAILURE,
    ],
    url: urls.UPLOAD_ANSWER,
    fetchOptions: {
      method: 'POST',
      dontContentType: true,
      body: getFormData({ file }),
    },
  },
});
