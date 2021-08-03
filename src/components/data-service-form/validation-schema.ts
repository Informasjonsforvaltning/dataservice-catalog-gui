import { object, array, string, addMethod } from 'yup';

import { MultiLanguageText } from '../../types';
import { Status, StatusText, ServiceType, Language } from '../../types/enums';

const messageRequired = 'Feltet må fylles ut';
const messageURL = 'Verdien må være en gyldig URL';
const messageStatus = 'Ugyldig status';
const messageServiceType = 'Ugyldig tjenestetype';

addMethod(object, 'atLeastOneLanguage', function atLeastOneLanguage() {
  return this.test({
    name: 'atLeastOneLanguage',
    message: messageRequired,
    exclusive: true,
    test(value: MultiLanguageText) {
      const { languages } = this.parent;
      return languages?.some((language: Language) => value[language]);
    }
  });
});

export default object().shape({
  status: string().oneOf([Status.DRAFT, Status.PUBLISHED]),
  title: (object() as any).atLeastOneLanguage(),
  endpointUrls: array()
    .of(string().ensure().url(messageURL).required(messageRequired))
    .ensure()
    .required(messageRequired),
  endpointDescriptions: array()
    .of(string().ensure().url(messageURL).required(messageRequired))
    .ensure()
    .required(messageRequired),
  dataServiceStatus: object().shape({
    statusText: string().oneOf(
      [
        StatusText.DEPRECATED,
        StatusText.EXPERIMENTAL,
        StatusText.REMOVED,
        StatusText.STABLE
      ],
      messageStatus
    )
  }),
  serviceType: string()
    .notRequired()
    .oneOf(
      [ServiceType.ACCOUNT_DETAILS, ServiceType.CUSTOMER_RELATIONS],
      messageServiceType
    ),
  landingPage: string().ensure().url(messageURL).notRequired(),
  pages: array()
    .of(string().ensure().url(messageURL).required(messageRequired))
    .ensure()
    .notRequired()
});
