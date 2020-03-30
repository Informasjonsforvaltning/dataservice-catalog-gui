import React, { memo, FC } from 'react';

import SC from './styled';
import FDKButton from '../fdk-button';

import { Language } from '../../types/enums';

interface Props {
  languages: { [key in Language]: boolean };
  toggleLanguage: (language: Language) => void;
}

const description = {
  [Language.NB]: 'Norsk bokmål (nb)',
  [Language.NN]: 'Norsk nynorsk (nn)',
  [Language.EN]: 'Engelsk (en)'
};

const LanguagePicker: FC<Props> = ({ languages, toggleLanguage }) => (
  <SC.LanguagePicker>
    <h2>Velg språk:</h2>
    {Object.entries(languages).map(([key, value]) => (
      <FDKButton
        key={key}
        variant={value ? 'default' : 'secondary'}
        text={description[key as Language]}
        onClick={() => toggleLanguage(key as Language)}
      />
    ))}
  </SC.LanguagePicker>
);

export default memo(LanguagePicker);
