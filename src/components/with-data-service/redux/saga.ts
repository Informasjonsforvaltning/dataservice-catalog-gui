import {
  all,
  call,
  debounce,
  takeLatest,
  getContext,
  put
} from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  GET_DATA_SERVICE_REQUESTED,
  PATCH_DATA_SERVICE_REQUESTED,
  DELETE_DATA_SERVICE_REQUESTED
} from './action-types';

const { DATA_SERVICE_CATALOG_URL } = env;

function* getDataServiceRequested({
  payload: { dataServiceId, organizationId, onError }
}: ReturnType<typeof actions.getDataServiceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);

    const { data, message } = yield call(
      axios.get,
      `${DATA_SERVICE_CATALOG_URL}/catalogs/${organizationId}/dataservices/${dataServiceId}`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.getDataServiceSucceeded(data));
    } else {
      yield put(actions.getDataServiceFailed(JSON.stringify(message)));
      onError();
    }
  } catch (e) {
    yield put(actions.getDataServiceFailed(e.message));
    onError();
  }
}

function* patchDataServiceRequested({
  payload: { dataService }
}: ReturnType<typeof actions.patchDataServiceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.patch,
      `${DATA_SERVICE_CATALOG_URL}/catalogs/${
        dataService.organizationId
      }/dataservices${dataService.id ? `/${dataService.id}` : ''}`,
      dataService,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.patchDataServiceSucceeded(data));
    } else {
      yield put(actions.patchDataServiceFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.patchDataServiceFailed(e.message));
  }
}

function* deleteDataServiceRequested({
  payload: { dataServiceId, organizationId, onSuccess }
}: ReturnType<typeof actions.deleteDataServiceRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { status, message } = yield call(
      axios.delete,
      `${DATA_SERVICE_CATALOG_URL}/catalogs/${organizationId}/dataservices/${dataServiceId}`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (status === 204) {
      yield put(actions.deleteDataServiceSucceeded());
      onSuccess();
    } else {
      yield put(actions.deleteDataServiceFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.deleteDataServiceFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATA_SERVICE_REQUESTED, getDataServiceRequested),
    debounce(1000, PATCH_DATA_SERVICE_REQUESTED, patchDataServiceRequested),
    takeLatest(DELETE_DATA_SERVICE_REQUESTED, deleteDataServiceRequested)
  ]);
}
