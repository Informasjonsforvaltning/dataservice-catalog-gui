import React, { FC, memo, useState } from 'react';
import { useFormik } from 'formik';

import FDKButton from '../fdk-button';
import TextField from '../field-text';
import AlertBox from '../alert-box';

import validationSchema from './validation-schema';
import withDataService, {
  Props as DataServiceProps
} from '../with-data-service';

import SC from './styled';

import { ImportMethod, AlertType } from '../../types/enums';

interface Props extends DataServiceProps {
  organizationId: string;
  dataServiceId?: string;
}

interface Alert {
  type: AlertType;
  message: string;
}

const DataServiceImportForm: FC<Props> = ({
  dataServiceActions: { importDataServiceRequested: importDataService },
  organizationId,
  dataServiceId
}) => {
  const [importMethod, setImportMethod] = useState<ImportMethod | null>(null);
  const [importFormStatus, setImportFormStatus] = useState<Alert | null>(null);

  const formik = useFormik({
    initialValues: {
      url: ''
    },
    initialErrors: {},
    validationSchema,
    onSubmit: ({ url }) => {
      importDataService(
        url,
        organizationId,
        message => {
          setImportFormStatus({
            type: AlertType.ERROR,
            message
          });
          formik.resetForm();
        },
        (): void => {
          setImportMethod(null);
          setImportFormStatus({
            type: AlertType.SUCCESS,
            message: `Successfully imported specification from ${url}`
          });
          formik.resetForm();
        },
        dataServiceId
      );
    }
  });

  return (
    <>
      <SC.DataServiceImportPanel>
        <SC.FormTitle>Importer spesifikasjon</SC.FormTitle>
        <p>
          Du kan importere en eksisterende spesifikasjon via lenke eller fil.
          Felles datakatalog støtter Open API-Specification 2.0, 3.0 og Swagger
          2.0.
        </p>
        {importMethod === ImportMethod.URI ? (
          <SC.DataServiceImportForm onSubmit={formik.handleSubmit}>
            <SC.InlineFields>
              <TextField
                labelText='Lenke til spesifikasjon'
                placeholder='Skriv inn url'
                name='url'
                onChange={formik.handleChange}
                value={formik.values.url}
              />

              <FDKButton
                disabled={!formik.isValid}
                type='submit'
                text='Importer'
                variant='secondary'
              />
              <FDKButton
                onClick={() => setImportMethod(null)}
                text='Avbryt'
                variant='anchor'
              />
            </SC.InlineFields>
            {formik.errors.url && (
              <AlertBox message={formik.errors.url} type={AlertType.ERROR} />
            )}
            {dataServiceId && (
              <AlertBox
                message='Some values may be overwritten by the imported specification'
                type={AlertType.WARNING}
              />
            )}
          </SC.DataServiceImportForm>
        ) : (
          <SC.ButtonGroup>
            <FDKButton
              variant='secondary'
              onClick={() => setImportMethod(ImportMethod.URI)}
              text='Import via lenke'
            />
            <FDKButton
              variant='secondary'
              onClick={() => setImportMethod(ImportMethod.FILE)}
              text='Import via fil'
            />
          </SC.ButtonGroup>
        )}
      </SC.DataServiceImportPanel>
      {importFormStatus && (
        <SC.FormStatus>
          <AlertBox
            message={importFormStatus.message}
            type={importFormStatus.type}
          />
        </SC.FormStatus>
      )}
    </>
  );
};

export default memo(withDataService(DataServiceImportForm));
