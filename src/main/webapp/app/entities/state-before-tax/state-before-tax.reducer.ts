import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStateBeforeTax, defaultValue } from 'app/shared/model/state-before-tax.model';

export const ACTION_TYPES = {
  SEARCH_STATEBEFORETAXES: 'stateBeforeTax/SEARCH_STATEBEFORETAXES',
  FETCH_STATEBEFORETAX_LIST: 'stateBeforeTax/FETCH_STATEBEFORETAX_LIST',
  FETCH_STATEBEFORETAX: 'stateBeforeTax/FETCH_STATEBEFORETAX',
  CREATE_STATEBEFORETAX: 'stateBeforeTax/CREATE_STATEBEFORETAX',
  UPDATE_STATEBEFORETAX: 'stateBeforeTax/UPDATE_STATEBEFORETAX',
  DELETE_STATEBEFORETAX: 'stateBeforeTax/DELETE_STATEBEFORETAX',
  RESET: 'stateBeforeTax/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStateBeforeTax>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StateBeforeTaxState = Readonly<typeof initialState>;

// Reducer

export default (state: StateBeforeTaxState = initialState, action): StateBeforeTaxState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_STATEBEFORETAXES):
    case REQUEST(ACTION_TYPES.FETCH_STATEBEFORETAX_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATEBEFORETAX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATEBEFORETAX):
    case REQUEST(ACTION_TYPES.UPDATE_STATEBEFORETAX):
    case REQUEST(ACTION_TYPES.DELETE_STATEBEFORETAX):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_STATEBEFORETAXES):
    case FAILURE(ACTION_TYPES.FETCH_STATEBEFORETAX_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATEBEFORETAX):
    case FAILURE(ACTION_TYPES.CREATE_STATEBEFORETAX):
    case FAILURE(ACTION_TYPES.UPDATE_STATEBEFORETAX):
    case FAILURE(ACTION_TYPES.DELETE_STATEBEFORETAX):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_STATEBEFORETAXES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATEBEFORETAX_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATEBEFORETAX):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATEBEFORETAX):
    case SUCCESS(ACTION_TYPES.UPDATE_STATEBEFORETAX):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATEBEFORETAX):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/state-before-taxes';
const apiSearchUrl = 'api/_search/state-before-taxes';

// Actions

export const getSearchEntities: ICrudSearchAction<IStateBeforeTax> = query => ({
  type: ACTION_TYPES.SEARCH_STATEBEFORETAXES,
  payload: axios.get<IStateBeforeTax>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IStateBeforeTax> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_STATEBEFORETAX_LIST,
    payload: axios.get<IStateBeforeTax>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IStateBeforeTax> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATEBEFORETAX,
    payload: axios.get<IStateBeforeTax>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStateBeforeTax> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATEBEFORETAX,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStateBeforeTax> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATEBEFORETAX,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStateBeforeTax> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATEBEFORETAX,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
