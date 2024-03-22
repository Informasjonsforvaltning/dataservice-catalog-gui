import React, { memo, PropsWithChildren, useState } from 'react';

import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import SC from './styled';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

interface Props {
  required?: boolean;
  deprecated?: boolean;
  title: string;
  subtitle: string;
  description?: string;
  isReadOnly?: boolean;
}

function Fieldset({
  required,
  deprecated,
  title,
  subtitle,
  description,
  isReadOnly,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpansion = () => setIsExpanded(!isExpanded);
  return (
    <SC.Fieldset {...props}>
      <SC.Legend>
        <SC.Inline>
          <SC.Title>{title}</SC.Title>
          {required && !isReadOnly && <SC.RequiredLabel text='Obligatorisk' />}
          {deprecated && !isReadOnly && <SC.DeprecatedLabel text='Utgått' />}
        </SC.Inline>
        {!isReadOnly && (
          <SC.Inline justifyContent='space-between'>
            <SC.Subtitle>{subtitle}</SC.Subtitle>
            {description && (
              <SC.Expand onClick={toggleExpansion}>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </SC.Expand>
            )}
          </SC.Inline>
        )}
        {isExpanded && description && !isReadOnly && (
          <SC.Description
            dangerouslySetInnerHTML={{
              __html: convertToSanitizedHtml(description)
            }}
          />
        )}
      </SC.Legend>
      {children}
    </SC.Fieldset>
  );
}

export default memo(Fieldset);
