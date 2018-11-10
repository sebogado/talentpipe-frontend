import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompanyType, defaultValue } from 'app/shared/model/company-type.model';

export const ACTION_TYPES = {
  SEARCH_COMPANYTYPES: 'companyType/SEARCH_COMPANYTYPES',
  FETCH_COMPANYTYPE_LIST: 'companyType/FETCH_COMPANYTYPE_LIST',
  FETCH_COMPANYTYPE: 'companyType/FETCH_COMPANYTYPE',
  CREATE_COMPANYTYPE: 'companyType/CREATE_COMPANYTYPE',
  UPDATE_COMPANYTYPE: 'companyType/UPDATE_COMPANYTYPE',
  DELETE_COMPANYTYPE: 'companyType/DELETE_COMPANYTYPE',
  RESET: 'companyType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompanyType>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CompanyTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: CompanyTypeState = initialState, action): CompanyTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_COMPANYTYPES):
    case REQUEST(ACTION_TYPES.FETCH_COMPANYTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPANYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPANYTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_COMPANYTYPE):
    case REQUEST(ACTION_TYPES.DELETE_COMPANYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_COMPANYTYPES):
    case FAILURE(ACTION_TYPES.FETCH_COMPANYTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPANYTYPE):
    case FAILURE(ACTION_TYPES.CREATE_COMPANYTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_COMPANYTYPE):
    case FAILURE(ACTION_TYPES.DELETE_COMPANYTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_COMPANYTYPES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANYTYPE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANYTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPANYTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPANYTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPANYTYPE):
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

const apiUrl = 'api/company-types';
const apiSearchUrl = 'api/_search/company-types';

// Actions

export const getSearchEntities: ICrudSearchAction<ICompanyType> = query => ({
  type: ACTION_TYPES.SEARCH_COMPANYTYPES,
  payload: axios.get<ICompanyType>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ICompanyType> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COMPANYTYPE_LIST,
    payload: axios.get<ICompanyType>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICompanyType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPANYTYPE,
    payload: axios.get<ICompanyType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICompanyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPANYTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompanyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPANYTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompanyType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPANYTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
