import { all, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  GET_DATASETS_REQUESTED,
  SEARCH_DATASETS_REQUESTED
} from './action-types';

import { Dataset } from '../../../types';

const { SEARCH_API } = env;

function* getDatasetsRequested({
  payload: { params }
}: ReturnType<typeof actions.getDatasetsRequested>) {
  try {
    const { data, message } = yield call(
      axios.get,
      `${SEARCH_API}/api/datasets`,
      {
        params,
        headers: {
          accept: 'application/json'
        }
      }
    );

    const datasets: Dataset[] = data?.hits?.hits.map(
      ({ _source }: any) => _source
    );

    if (datasets) {
      yield put(actions.getDatasetsSucceeded(datasets));
    } else {
      yield put(actions.getDatasetsFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.getDatasetsFailed(e.message));
  }
}

function* searchDatasetsRequested({
  payload: { params, onSuccess }
}: ReturnType<typeof actions.searchDatasetsRequested>) {
  try {
    const { data, message } = yield call(
      axios.get,
      `${SEARCH_API}/api/datasets`,
      {
        params,
        headers: {
          accept: 'application/json'
        }
      }
    );

    if (data?.hits?.hits) {
      yield put(
        actions.searchDatasetsSucceeded(
          data?.hits?.hits.map(({ _source }: any) => _source)
        )
      );
      onSuccess?.();
    } else {
      yield put(actions.searchDatasetsFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.searchDatasetsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASETS_REQUESTED, getDatasetsRequested),
    takeLatest(SEARCH_DATASETS_REQUESTED, searchDatasetsRequested)
  ]);
}
