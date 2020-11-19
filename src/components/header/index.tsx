import React, { memo } from 'react';
import InternalHeader from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import env from '../../env';

import { withAuth } from '../../providers/auth';

import SC from './styled';
import { Auth } from '../../lib/auth/auth';

interface Props {
  authService: Auth;
}

const { ADMIN_GUI_HOST, FDK_REGISTRATION_BASE_URI, SEARCH_API } = env;

const Header = ({ authService }: Props): JSX.Element => {
  const userName = authService.getUser()?.name;
  const logOutAndRedirect = () => authService.logout();

  return (
    <SC.Header>
      <InternalHeader
        homeUrl={FDK_REGISTRATION_BASE_URI}
        username={userName}
        onLogout={logOutAndRedirect}
      >
        <Link href={`${SEARCH_API}/guidance`}>Registrere data</Link>guidance
        <Link href={ADMIN_GUI_HOST}>Høste data</Link>
        <Link href={SEARCH_API} external>
          Søk i Felles datakatalog
        </Link>
      </InternalHeader>
    </SC.Header>
  );
};

export default memo(withAuth(Header));
