import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_REFERENCE_DATA_REQUESTED,
  GET_REFERENCE_DATA_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  referenceData: {}
}).toMap();

export default function reducer(state, action: Actions<typeof actions>) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case GET_REFERENCE_DATA_REQUESTED:
      return state.setIn(['referenceData', action.payload.category], null);
    case GET_REFERENCE_DATA_SUCCEEDED: {
      const { category, data } = action.payload;
      return state.setIn(['referenceData', category], fromJS(data));
    }
    default:
      return state;
  }
}
