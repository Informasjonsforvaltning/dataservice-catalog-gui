import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { Dataset } from '../../types';

export interface Props {
  datasets: Dataset[];
  datasetSearchSuggestions: Dataset[];
  datasetsActions: typeof actions;
}

const withDatasets = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: any) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasets: state.DatasetsReducer.get('datasets').toJS(),
    datasetSearchSuggestions: state.DatasetsReducer.get(
      'datasetSearchSuggestions'
    ).toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetsActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDatasets;
