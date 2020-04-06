import { createGlobalStyle } from 'styled-components';

import { hot } from 'react-hot-loader/root';

import ResetStyles from './reset';
import NormaliseStyles from './normalise';
import CommonStyles from './common';

export default hot(createGlobalStyle`
  ${ResetStyles}
  ${NormaliseStyles}
  ${CommonStyles}
`);
