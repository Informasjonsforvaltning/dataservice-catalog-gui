import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED,
  SEARCH_DATASETS_REQUESTED,
  SEARCH_DATASETS_SUCCEEDED,
  SEARCH_DATASETS_FAILED,
  ADD_DATASET
} from './action-types';

import { Dataset } from '../../../types';

export function getDatasetsRequested(body: object) {
  return {
    type: GET_DATASETS_REQUESTED,
    payload: {
      body
    }
  };
}

export function getDatasetsSucceeded(datasets: Dataset[]) {
  return {
    type: GET_DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function getDatasetsFailed(message: string) {
  return {
    type: GET_DATASETS_FAILED,
    payload: {
      message
    }
  };
}

export function searchDatasetsRequested(q: string, onSuccess?: () => void) {
  return {
    type: SEARCH_DATASETS_REQUESTED,
    payload: {
      q,
      onSuccess
    }
  };
}

export function searchDatasetsSucceeded(datasets: Dataset[]) {
  return {
    type: SEARCH_DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function searchDatasetsFailed(message: string) {
  return {
    type: SEARCH_DATASETS_FAILED,
    payload: {
      message
    }
  };
}

export function addDataset(dataset: Dataset) {
  return {
    type: ADD_DATASET,
    payload: {
      dataset
    }
  };
}
