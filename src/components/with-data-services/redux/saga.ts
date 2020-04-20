import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { FETCH_ALL_DATA_SERVICES_REQUESTED } from './action-types';

const { DATA_SERVICE_CATALOG_URL } = env;

function* fetchAllDataServicesRequested({
  payload: { organizationId }
}: ReturnType<typeof actions.fetchAllDataServicesRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${DATA_SERVICE_CATALOG_URL}/catalogs/${organizationId}/dataservices`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (Array.isArray(data)) {
      yield put(actions.fetchAllDataServicesSucceeded(data));
    } else {
      yield put(actions.fetchAllDataServicesFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchAllDataServicesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ALL_DATA_SERVICES_REQUESTED, fetchAllDataServicesRequested)
  ]);
}
