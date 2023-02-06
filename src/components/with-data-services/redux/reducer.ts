import { fromJS } from 'immutable';

import { translate, isString } from '../../../lib/localization';

import * as actions from './actions';
import {
  FETCH_ALL_DATA_SERVICES_SUCCEEDED,
  SORT_DATA_SERVICES
} from './action-types';

import { Actions } from '../../../types';
import { SortOrder } from '../../../types/enums';

const initialState = fromJS({
  dataServices: []
}).toMap();

export default function reducer(state, action: Actions<typeof actions>) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case FETCH_ALL_DATA_SERVICES_SUCCEEDED:
      return state.set('dataServices', fromJS(action.payload.dataServices));
    case SORT_DATA_SERVICES:
      return state.update('dataServices', (dataServices: any) =>
        dataServices.sort((a: any, b: any) => {
          const { field, order } = action.payload;
          if (a.hasIn(field) && b.hasIn(field)) {
            const fieldA = isString(a.getIn(field))
              ? a.getIn(field)
              : a.getIn(field).toJS();
            const fieldB = isString(b.getIn(field))
              ? b.getIn(field)
              : b.getIn(field).toJS();
            return (
              translate(fieldA).localeCompare(translate(fieldB)) *
              (order === SortOrder.DSC ? 1 : -1)
            );
          }
          return 0;
        })
      );
    default:
      return state;
  }
}
