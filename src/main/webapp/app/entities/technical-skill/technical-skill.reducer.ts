import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITechnicalSkill, defaultValue } from 'app/shared/model/technical-skill.model';

export const ACTION_TYPES = {
  SEARCH_TECHNICALSKILLS: 'technicalSkill/SEARCH_TECHNICALSKILLS',
  FETCH_TECHNICALSKILL_LIST: 'technicalSkill/FETCH_TECHNICALSKILL_LIST',
  FETCH_TECHNICALSKILL: 'technicalSkill/FETCH_TECHNICALSKILL',
  CREATE_TECHNICALSKILL: 'technicalSkill/CREATE_TECHNICALSKILL',
  UPDATE_TECHNICALSKILL: 'technicalSkill/UPDATE_TECHNICALSKILL',
  DELETE_TECHNICALSKILL: 'technicalSkill/DELETE_TECHNICALSKILL',
  RESET: 'technicalSkill/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITechnicalSkill>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TechnicalSkillState = Readonly<typeof initialState>;

// Reducer

export default (state: TechnicalSkillState = initialState, action): TechnicalSkillState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_TECHNICALSKILLS):
    case REQUEST(ACTION_TYPES.FETCH_TECHNICALSKILL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TECHNICALSKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TECHNICALSKILL):
    case REQUEST(ACTION_TYPES.UPDATE_TECHNICALSKILL):
    case REQUEST(ACTION_TYPES.DELETE_TECHNICALSKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_TECHNICALSKILLS):
    case FAILURE(ACTION_TYPES.FETCH_TECHNICALSKILL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TECHNICALSKILL):
    case FAILURE(ACTION_TYPES.CREATE_TECHNICALSKILL):
    case FAILURE(ACTION_TYPES.UPDATE_TECHNICALSKILL):
    case FAILURE(ACTION_TYPES.DELETE_TECHNICALSKILL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_TECHNICALSKILLS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TECHNICALSKILL_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TECHNICALSKILL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TECHNICALSKILL):
    case SUCCESS(ACTION_TYPES.UPDATE_TECHNICALSKILL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TECHNICALSKILL):
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

const apiUrl = 'api/technical-skills';
const apiSearchUrl = 'api/_search/technical-skills';

// Actions

export const getSearchEntities: ICrudSearchAction<ITechnicalSkill> = query => ({
  type: ACTION_TYPES.SEARCH_TECHNICALSKILLS,
  payload: axios.get<ITechnicalSkill>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ITechnicalSkill> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TECHNICALSKILL_LIST,
    payload: axios.get<ITechnicalSkill>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITechnicalSkill> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TECHNICALSKILL,
    payload: axios.get<ITechnicalSkill>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITechnicalSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TECHNICALSKILL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITechnicalSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TECHNICALSKILL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITechnicalSkill> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TECHNICALSKILL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
