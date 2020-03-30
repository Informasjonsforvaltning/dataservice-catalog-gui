import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { DataService } from '../../types';

export interface Props {
  dataService: DataService | null;
  dataServiceActions: typeof actions;
}

const withDataService = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: any) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    dataService: state.DataServiceReducer.get('dataService')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    dataServiceActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDataService;
