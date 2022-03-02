import { all, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  GET_DATASETS_REQUESTED,
  SEARCH_DATASETS_REQUESTED
} from './action-types';

import { Dataset } from '../../../types';

const { SEARCH_FULLTEXT_HOST } = env;

function* getDatasetsRequested({
  payload: { body }
}: ReturnType<typeof actions.getDatasetsRequested>) {
  try {
    const { data, message } = yield call(
      axios.post,
      `${SEARCH_FULLTEXT_HOST}/datasets`,
      body
    );

    const datasets: Dataset[] = data?.hits;

    if (datasets) {
      yield put(actions.getDatasetsSucceeded(datasets));
    } else {
      yield put(actions.getDatasetsFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.getDatasetsFailed(e.message));
  }
}

function* searchDatasetsRequested({
  payload: { body, onSuccess }
}: ReturnType<typeof actions.searchDatasetsRequested>) {
  try {
    const { data, message } = yield call(
      axios.post,
      `${SEARCH_FULLTEXT_HOST}/datasets`,
      body
    );

    if (data?.hits) {
      yield put(actions.searchDatasetsSucceeded(data?.hits));
      onSuccess?.();
    } else {
      yield put(actions.searchDatasetsFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.searchDatasetsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASETS_REQUESTED, getDatasetsRequested),
    takeLatest(SEARCH_DATASETS_REQUESTED, searchDatasetsRequested)
  ]);
}
