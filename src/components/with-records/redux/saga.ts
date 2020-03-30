import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { FETCH_ALL_DATASERVICES_REQUESTED } from './action-types';

const { RECORDS_OF_PROCESSING_ACTIVITIES_URL } = env;

function* fetchAllDataServicesRequested({
  payload: { organizationId }
}: ReturnType<typeof actions.fetchAllDataServicesRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${RECORDS_OF_PROCESSING_ACTIVITIES_URL}/api/organizations/${organizationId}/records`,
      {
        params: { limit: 1000 },
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data && data.hits) {
      yield put(actions.fetchAllDataServicesSucceeded(data.hits));
    } else {
      yield put(actions.fetchAllDataServicesFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchAllDataServicesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ALL_DATASERVICES_REQUESTED, fetchAllDataServicesRequested)
  ]);
}
