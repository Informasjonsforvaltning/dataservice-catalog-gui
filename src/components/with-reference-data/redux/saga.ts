import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import { GET_REFERENCE_DATA_REQUESTED } from './action-types';
import * as actions from './actions';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { ReferenceData } from '../../../types';

const { SEARCH_API } = env;

const endpoint = (category: keyof ReferenceData) => {
  switch (category) {
    case 'mediatypes':
      return '/reference-data/iana/media-types';
    case 'openlicenses':
      return '/reference-data/open-licenses';
    case 'filetypes':
      return '/reference-data/eu/file-types';
    default:
      throw Error('Reference category not implemented');
  }
};

function* getReferenceDataRequested({
  payload: { category }
}: ReturnType<typeof actions.getReferenceDataRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${SEARCH_API}${endpoint(category)}`
    );
    if (data) {
      if (category === 'mediatypes') {
        yield put(actions.getReferenceDataSucceeded(category, data.mediaTypes));
      } else if (category === 'filetypes') {
        yield put(actions.getReferenceDataSucceeded(category, data.fileTypes));
      } else {
        yield put(
          actions.getReferenceDataSucceeded(category, data.openLicenses)
        );
      }
    } else {
      yield put(actions.getReferenceDataFailed(''));
    }
  } catch (e: any) {
    yield put(
      actions.getReferenceDataFailed(e instanceof Error ? e.message : String(e))
    );
  }
}

export default function* saga() {
  yield all([
    takeEvery(GET_REFERENCE_DATA_REQUESTED, getReferenceDataRequested)
  ]);
}
