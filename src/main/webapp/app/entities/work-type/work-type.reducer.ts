import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IWorkType, defaultValue } from 'app/shared/model/work-type.model';

export const ACTION_TYPES = {
  SEARCH_WORKTYPES: 'workType/SEARCH_WORKTYPES',
  FETCH_WORKTYPE_LIST: 'workType/FETCH_WORKTYPE_LIST',
  FETCH_WORKTYPE: 'workType/FETCH_WORKTYPE',
  CREATE_WORKTYPE: 'workType/CREATE_WORKTYPE',
  UPDATE_WORKTYPE: 'workType/UPDATE_WORKTYPE',
  DELETE_WORKTYPE: 'workType/DELETE_WORKTYPE',
  RESET: 'workType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IWorkType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type WorkTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: WorkTypeState = initialState, action): WorkTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_WORKTYPES):
    case REQUEST(ACTION_TYPES.FETCH_WORKTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_WORKTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_WORKTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_WORKTYPE):
    case REQUEST(ACTION_TYPES.DELETE_WORKTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_WORKTYPES):
    case FAILURE(ACTION_TYPES.FETCH_WORKTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_WORKTYPE):
    case FAILURE(ACTION_TYPES.CREATE_WORKTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_WORKTYPE):
    case FAILURE(ACTION_TYPES.DELETE_WORKTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_WORKTYPES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORKTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_WORKTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_WORKTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_WORKTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_WORKTYPE):
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

const apiUrl = 'api/work-types';
const apiSearchUrl = 'api/_search/work-types';

// Actions

export const getSearchEntities: ICrudSearchAction<IWorkType> = query => ({
  type: ACTION_TYPES.SEARCH_WORKTYPES,
  payload: axios.get<IWorkType>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IWorkType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_WORKTYPE_LIST,
  payload: axios.get<IWorkType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IWorkType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_WORKTYPE,
    payload: axios.get<IWorkType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IWorkType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_WORKTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IWorkType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_WORKTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IWorkType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_WORKTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
