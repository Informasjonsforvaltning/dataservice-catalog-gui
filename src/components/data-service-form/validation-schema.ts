import { object, string, lazy } from 'yup';

import { Status, StatusText, ServiceType } from '../../types/enums';

export default object().shape({
  status: string().oneOf([Status.DRAFT, Status.PUBLISHED]),
  title: lazy((values: any) => {
    const hasValues = Object.values(values).filter(Boolean).length > 0;
    return object().shape(
      Object.entries(values).reduce(
        (previous, [key]) => ({
          ...previous,
          [key]: hasValues
            ? string().ensure()
            : string().ensure().required('Feltet må fylles ut')
        }),
        {}
      )
    );
  }),
  // ENDPOINT URL
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
