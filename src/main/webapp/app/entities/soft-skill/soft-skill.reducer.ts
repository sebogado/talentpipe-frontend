import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISoftSkill, defaultValue } from 'app/shared/model/soft-skill.model';

export const ACTION_TYPES = {
  SEARCH_SOFTSKILLS: 'softSkill/SEARCH_SOFTSKILLS',
  FETCH_SOFTSKILL_LIST: 'softSkill/FETCH_SOFTSKILL_LIST',
  FETCH_SOFTSKILL: 'softSkill/FETCH_SOFTSKILL',
  CREATE_SOFTSKILL: 'softSkill/CREATE_SOFTSKILL',
  UPDATE_SOFTSKILL: 'softSkill/UPDATE_SOFTSKILL',
  DELETE_SOFTSKILL: 'softSkill/DELETE_SOFTSKILL',
  RESET: 'softSkill/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISoftSkill>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SoftSkillState = Readonly<typeof initialState>;

// Reducer

export default (state: SoftSkillState = initialState, action): SoftSkillState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SOFTSKILLS):
    case REQUEST(ACTION_TYPES.FETCH_SOFTSKILL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SOFTSKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SOFTSKILL):
    case REQUEST(ACTION_TYPES.UPDATE_SOFTSKILL):
    case REQUEST(ACTION_TYPES.DELETE_SOFTSKILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_SOFTSKILLS):
    case FAILURE(ACTION_TYPES.FETCH_SOFTSKILL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SOFTSKILL):
    case FAILURE(ACTION_TYPES.CREATE_SOFTSKILL):
    case FAILURE(ACTION_TYPES.UPDATE_SOFTSKILL):
    case FAILURE(ACTION_TYPES.DELETE_SOFTSKILL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SOFTSKILLS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOFTSKILL_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SOFTSKILL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SOFTSKILL):
    case SUCCESS(ACTION_TYPES.UPDATE_SOFTSKILL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SOFTSKILL):
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

const apiUrl = 'api/soft-skills';
const apiSearchUrl = 'api/_search/soft-skills';

// Actions

export const getSearchEntities: ICrudSearchAction<ISoftSkill> = query => ({
  type: ACTION_TYPES.SEARCH_SOFTSKILLS,
  payload: axios.get<ISoftSkill>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<ISoftSkill> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SOFTSKILL_LIST,
    payload: axios.get<ISoftSkill>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISoftSkill> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SOFTSKILL,
    payload: axios.get<ISoftSkill>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISoftSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SOFTSKILL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISoftSkill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SOFTSKILL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISoftSkill> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SOFTSKILL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
