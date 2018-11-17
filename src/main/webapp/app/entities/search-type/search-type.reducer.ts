import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISearchType, defaultValue } from 'app/shared/model/search-type.model';

export const ACTION_TYPES = {
  SEARCH_SEARCHTYPES: 'searchType/SEARCH_SEARCHTYPES',
  FETCH_SEARCHTYPE_LIST: 'searchType/FETCH_SEARCHTYPE_LIST',
  FETCH_SEARCHTYPE: 'searchType/FETCH_SEARCHTYPE',
  CREATE_SEARCHTYPE: 'searchType/CREATE_SEARCHTYPE',
  UPDATE_SEARCHTYPE: 'searchType/UPDATE_SEARCHTYPE',
  DELETE_SEARCHTYPE: 'searchType/DELETE_SEARCHTYPE',
  RESET: 'searchType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISearchType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SearchTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: SearchTypeState = initialState, action): SearchTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SEARCHTYPES):
    case REQUEST(ACTION_TYPES.FETCH_SEARCHTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SEARCHTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SEARCHTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_SEARCHTYPE):
    case REQUEST(ACTION_TYPES.DELETE_SEARCHTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SEARCHTYPES):
    case FAILURE(ACTION_TYPES.FETCH_SEARCHTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEARCHTYPE):
    case FAILURE(ACTION_TYPES.CREATE_SEARCHTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_SEARCHTYPE):
    case FAILURE(ACTION_TYPES.DELETE_SEARCHTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SEARCHTYPES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEARCHTYPE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEARCHTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SEARCHTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_SEARCHTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SEARCHTYPE):
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

const apiUrl = 'api/search-types';
const apiSearchUrl = 'api/_search/search-types';

// Actions

export const getSearchEntities: ICrudSearchAction<ISearchType> = query => ({
  type: ACTION_TYPES.SEARCH_SEARCHTYPES,
  payload: axios.get<ISearchType>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ISearchType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SEARCHTYPE_LIST,
    payload: axios.get<ISearchType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISearchType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SEARCHTYPE,
    payload: axios.get<ISearchType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISearchType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SEARCHTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISearchType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SEARCHTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISearchType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SEARCHTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
