import { object, string, addMethod } from 'yup';

import { MultiLanguageText } from '../../types';
import { Status, StatusText, ServiceType, Language } from '../../types/enums';

addMethod(object, 'atLeastOneLanguage', function atLeastOneLanguage() {
  return this.test({
    name: 'atLeastOneLanguage',
    message: 'Feltet må fylles ut',
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
  endpointUrl: string().ensure().url().required('Feltet må fylles ut'),
  dataServiceStatus: object().shape({
    statusText: string().oneOf([
      StatusText.DEPRECATED,
      StatusText.EXPERIMENTAL,
      StatusText.REMOVED,
      StatusText.STABLE
    ])
  }),
  serviceType: string()
    .notRequired()
    .oneOf([ServiceType.ACCOUNT_DETAILS, ServiceType.CUSTOMER_RELATIONS])
});
