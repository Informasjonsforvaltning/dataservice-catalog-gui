import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATA_SERVICE_SUCCEEDED,
  PATCH_DATA_SERVICE_SUCCEEDED,
  DELETE_DATA_SERVICE_SUCCEEDED,
  IMPORT_DATA_SERVICE_SUCCEEDED,
  RESET_DATA_SERVICE
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  dataService: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATA_SERVICE_SUCCEEDED:
    case PATCH_DATA_SERVICE_SUCCEEDED:
      return state.set('dataService', fromJS(action.payload.dataService));
    case RESET_DATA_SERVICE:
    case DELETE_DATA_SERVICE_SUCCEEDED:
      return state.set('dataService', null);

    case IMPORT_DATA_SERVICE_SUCCEEDED:
      return state.set('dataService', fromJS(action.payload.dataService));
    // return state.set(
    //   'dataService',
    //   fromJS({
    //     ...(state.get('dataService')?.toJS() ?? null),
    //     ...action.payload.dataService
    //   })
    // );
    default:
      return state;
  }
}
