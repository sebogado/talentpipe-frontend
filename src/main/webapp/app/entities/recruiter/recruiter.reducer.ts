import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRecruiter, defaultValue } from 'app/shared/model/recruiter.model';

export const ACTION_TYPES = {
  SEARCH_RECRUITERS: 'recruiter/SEARCH_RECRUITERS',
  FETCH_RECRUITER_LIST: 'recruiter/FETCH_RECRUITER_LIST',
  FETCH_RECRUITER: 'recruiter/FETCH_RECRUITER',
  CREATE_RECRUITER: 'recruiter/CREATE_RECRUITER',
  UPDATE_RECRUITER: 'recruiter/UPDATE_RECRUITER',
  DELETE_RECRUITER: 'recruiter/DELETE_RECRUITER',
  RESET: 'recruiter/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRecruiter>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RecruiterState = Readonly<typeof initialState>;

// Reducer

export default (state: RecruiterState = initialState, action): RecruiterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_RECRUITERS):
    case REQUEST(ACTION_TYPES.FETCH_RECRUITER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECRUITER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RECRUITER):
    case REQUEST(ACTION_TYPES.UPDATE_RECRUITER):
    case REQUEST(ACTION_TYPES.DELETE_RECRUITER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_RECRUITERS):
    case FAILURE(ACTION_TYPES.FETCH_RECRUITER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECRUITER):
    case FAILURE(ACTION_TYPES.CREATE_RECRUITER):
    case FAILURE(ACTION_TYPES.UPDATE_RECRUITER):
    case FAILURE(ACTION_TYPES.DELETE_RECRUITER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_RECRUITERS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECRUITER_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECRUITER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECRUITER):
    case SUCCESS(ACTION_TYPES.UPDATE_RECRUITER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECRUITER):
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

const apiUrl = 'api/recruiters';
const apiSearchUrl = 'api/_search/recruiters';

// Actions

export const getSearchEntities: ICrudSearchAction<IRecruiter> = query => ({
  type: ACTION_TYPES.SEARCH_RECRUITERS,
  payload: axios.get<IRecruiter>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IRecruiter> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_RECRUITER_LIST,
    payload: axios.get<IRecruiter>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRecruiter> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECRUITER,
    payload: axios.get<IRecruiter>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRecruiter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECRUITER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRecruiter> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECRUITER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRecruiter> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECRUITER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
