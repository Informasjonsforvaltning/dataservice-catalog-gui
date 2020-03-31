import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { DataService } from '../../types';

export interface Props {
  dataServices: DataService[];
  dataServicesActions: typeof actions;
}

const withDataServices = (WrappedComponent: ComponentType<any>) => {
  // TODO: replace any with Props
  const WrappedComponentwithDataServices = (props: any) => (
    <WrappedComponent {...props} />
  );

  const mapStateToProps = (state: any) => ({
    dataServices: state.DataServicesReducer.get('dataServices').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    dataServicesActions: bindActionCreators(actions, dispatch)
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(WrappedComponentwithDataServices));
};

export default withDataServices;
