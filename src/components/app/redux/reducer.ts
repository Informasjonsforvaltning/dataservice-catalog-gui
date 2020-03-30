import { combineReducers } from 'redux';

import OrganizationReducer from '../../with-organization/redux/reducer';
import DataServicesReducer from '../../with-data-services/redux/reducer';
import DataServiceReducer from '../../with-data-service/redux/reducer';
import DatasetsReducer from '../../with-datasets/redux/reducer';
import ReferenceDataReducer from '../../with-reference-data/redux/reducer';

export default combineReducers({
  OrganizationReducer,
  DataServicesReducer,
  DataServiceReducer,
  DatasetsReducer,
  ReferenceDataReducer
});
