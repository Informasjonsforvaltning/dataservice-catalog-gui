import { all } from 'redux-saga/effects';

import organizationSaga from '../../with-organization/redux/saga';
import dataServicesSaga from '../../with-data-services/redux/saga';
import dataServiceSaga from '../../with-data-service/redux/saga';
import datasetsSaga from '../../with-datasets/redux/saga';
import referenceDataSaga from '../../with-reference-data/redux/saga';

export default function* saga(): Generator {
  yield all([
    organizationSaga(),
    dataServicesSaga(),
    dataServiceSaga(),
    datasetsSaga(),
    referenceDataSaga()
  ]);
}
