import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { Record } from '../../types';

export interface Props {
  records: Record[];
  recordsActions: typeof actions;
}

const withDataServices = (WrappedComponent: ComponentType<any>) => {
  // TODO: replace any with Props
  const WrappedComponentwithDataServices = (props: any) => (
    <WrappedComponent {...props} />
  );

  const mapStateToProps = (state: any) => ({
    records: state.RecordsReducer.get('records').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    recordsActions: bindActionCreators(actions, dispatch)
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(WrappedComponentwithDataServices));
};

export default withDataServices;
