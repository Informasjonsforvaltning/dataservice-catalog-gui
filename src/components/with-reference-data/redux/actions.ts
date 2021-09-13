import { ReferenceData } from '../../../types';
import {
  GET_REFERENCE_DATA_REQUESTED,
  GET_REFERENCE_DATA_SUCCEEDED,
  GET_REFERENCE_DATA_FAILED
} from './action-types';

export function getReferenceDataRequested(category: keyof ReferenceData) {
  return {
    type: GET_REFERENCE_DATA_REQUESTED,
    payload: {
      category
    }
  };
}

export function getReferenceDataSucceeded(
  category: keyof ReferenceData,
  data: any
) {
  return {
    type: GET_REFERENCE_DATA_SUCCEEDED,
    payload: {
      category,
      data
    }
  };
}

export function getReferenceDataFailed(message: string) {
  return {
    type: GET_REFERENCE_DATA_FAILED,
    payload: {
      message
    }
  };
}
