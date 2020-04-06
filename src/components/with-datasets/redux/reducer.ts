import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASETS_SUCCEEDED,
  SEARCH_DATASETS_SUCCEEDED,
  ADD_DATASET
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  datasets: [],
  datasetSearchSuggestions: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASETS_SUCCEEDED:
      return state.set('datasets', fromJS(action.payload.datasets));
    case SEARCH_DATASETS_SUCCEEDED:
      return state.set(
        'datasetSearchSuggestions',
        fromJS(action.payload.datasets)
      );
    case ADD_DATASET:
      return state.set(
        'datasets',
        state.get('datasets').push(fromJS(action.payload.dataset))
      );
    default:
      return state;
  }
}
