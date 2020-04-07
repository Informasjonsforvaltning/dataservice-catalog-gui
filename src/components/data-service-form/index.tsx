import React, {
  FC,
  memo,
  Fragment,
  useEffect,
  useRef,
  useState,
  ChangeEvent
} from 'react';
import { compose } from 'redux';
import { FormikProps, withFormik, FieldArray } from 'formik';
import { compare, Operation } from 'fast-json-patch';

import {
  localization as translations,
  translate
} from '../../lib/localization';

import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withDataService, {
  Props as DataServiceProps
} from '../with-data-service';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../with-reference-data';

import MultilingualInput from '../multilingual-input';
import LanguagePicker from '../language-picker';
import TextField from '../field-text';
import TextAreaField from '../field-text-area';
import TextTagsField from '../field-text-tags';
import TextTagsSearchField from '../field-text-tags-search';
import Radio from '../radio';
import Select from '../select';

import SC from './styled';

import AddIcon from '../../images/icon-add.svg';
import RemoveIcon from '../../images/icon-remove.svg';
import ExpandAllUpIcon from '../../images/expand-all-up.svg';
import ExpandAllDownIcon from '../../images/expand-all-down.svg';

import validationSchema from './validation-schema';

import { mapDataServiceToValues } from './utils';

import { DataService, Dataset, MediaType } from '../../types';
import { Status, StatusText, ServiceType, Language } from '../../types/enums';

interface FormValues extends DataService {
  languages?: Language[];
}

interface Props
  extends DataServiceProps,
    DatasetsProps,
    ReferenceDataProps,
    FormikProps<FormValues> {
  dataServiceStatus: Status;
  onTitleChange?: (title: string) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const DataServiceForm: FC<Props> = ({
  dataService,
  dataServiceStatus,
  datasets,
  datasetSearchSuggestions,
  referenceData: { mediatypes: mediaTypes },
  onTitleChange,
  onValidityChange,
  datasetsActions: {
    getDatasetsRequested: getDatasets,
    searchDatasetsRequested: searchDatasets,
    addDataset
  },
  dataServiceActions: { patchDataServiceRequested: patchDataService },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  values,
  errors,
  touched,
  isValid,
  validateForm,
  handleChange,
  setValues,
  setFieldValue
}) => {
  const [allExpanded, setAllExpanded] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);
  const mounted = useRef(false);
  const dataServiceLoaded = useRef(false);
  const previousDataService = useRef<DataService>(values);

  const [mediaTypesSuggestions, setMediaTypesSuggestions] = useState<
    MediaType[]
  >([]);
  const [
    isWaitingForMediaTypesSuggestions,
    setIsWaitingForMediaTypesSuggestions
  ] = useState(false);

  const [datasetSuggestions, setDatasetSuggestions] = useState<Dataset[]>([]);
  const [
    isWaitingForDatasetSuggestions,
    setIsWaitingForDatasetSuggestions
  ] = useState(false);

  useEffect(() => {
    getReferenceData('mediatypes');
    getDatasets({});
    mounted.current = true;
  }, []);

  const isMounted = mounted.current;
  const isDataServiceLoaded = dataServiceLoaded.current;
  const allFieldsExpanded = allExpanded.every(Boolean);
  const isPublished = dataService?.status === Status.PUBLISHED;

  const [languages, setLanguages] = useState({
    [Language.NB]: true,
    [Language.NN]: false,
    [Language.EN]: false
  });

  const selectedLanguages = Object.entries(languages)
    .filter(([_, selected]) => selected)
    .map<Language>(([language, _]) => language as Language);

  const toggleLanguage = (key: Language) => {
    const isOnlyOneSelectedLanguage =
      Object.values(languages).filter(selected => selected).length === 1;

    if (!languages[key] || !isOnlyOneSelectedLanguage) {
      setLanguages({ ...languages, [key]: !languages[key] });
    }
  };

  const toggleAllExpanded = () =>
    setAllExpanded(allExpanded.map(() => !allFieldsExpanded));

  const handleBooleanRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (['true', 'false'].includes(e.target.value)) {
      e.persist();
      setFieldValue(e.target.name, e.target.value === 'true', true);
    }
  };

  useEffect(() => {
    if (dataService) {
      const dataServiceValues = mapDataServiceToValues(dataService);
      if (!isDataServiceLoaded) {
        setValues(dataServiceValues, true);
        previousDataService.current = dataServiceValues;
        dataServiceLoaded.current = true;
      } else {
        const previousDataServiceStatus = dataService?.status;
        const nextDataServiceStatus = previousDataService.current.status;
        if (previousDataServiceStatus !== nextDataServiceStatus) {
          setValues(dataServiceValues, true);
          previousDataService.current = dataServiceValues;
        }
      }
    }
  }, [dataService]);

  useEffect(() => {
    if (isMounted) {
      const previousDataServiceStatus = dataService?.status;
      const nextDataServiceStatus = dataServiceStatus;
      if (previousDataServiceStatus !== nextDataServiceStatus) {
        const newValues = { ...values, status: nextDataServiceStatus };
        if (
          previousDataServiceStatus === Status.DRAFT &&
          nextDataServiceStatus === Status.PUBLISHED
        ) {
          if (isValid) {
            patchDataService(newValues);
          }
        } else {
          patchDataService(newValues);
        }
      }
    }
  }, [dataServiceStatus]);

  useEffect(() => {
    if (isMounted) {
      onValidityChange?.(isValid);
    }
  }, [values, isValid]);

  useEffect(() => {
    const validateAndSave = async () => {
      const diff: Operation[] = compare(previousDataService.current, values);
      const hasErrors =
        Object.keys(
          await validateForm({ ...values, languages: selectedLanguages })
        ).length > 0;
      if (
        diff.length > 0 &&
        !(dataService?.status === Status.PUBLISHED && hasErrors)
      ) {
        patchDataService(values);
      }
    };
    validateAndSave();
  }, [values]);

  useEffect(() => {
    if (onTitleChange) {
      onTitleChange(
        translate(values?.title)?.trim() ||
          'Åpne Data fra Enhetsregisteret - API Dokumentasjon'
      );
    }
  }, [values?.title]);

  useEffect(() => {
    setDatasetSuggestions(datasetSearchSuggestions);
    setIsWaitingForDatasetSuggestions(false);
  }, [datasetSearchSuggestions]);

  return (
    <SC.DataServiceForm>
      <LanguagePicker languages={languages} toggleLanguage={toggleLanguage} />
      <SC.ExpandAllButton as='a' onClick={toggleAllExpanded}>
        <span>
          {allFieldsExpanded ? 'Lukk alle felter' : 'Åpne alle felter'}
        </span>
        {allFieldsExpanded ? <ExpandAllUpIcon /> : <ExpandAllDownIcon />}
      </SC.ExpandAllButton>
      <SC.DataServiceFormSection
        title='Tittel og beskrivelse'
        required
        isExpanded={allExpanded[0]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 0 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Tittel'
          subtitle='Den korte hjelpeteksten som oppsummerer hvordan feltet skal fylles ut'
          required
        >
          <MultilingualInput
            name='title'
            component={TextField}
            languages={selectedLanguages}
            value={values.title}
            error={isPublished && touched.title && errors.title}
            helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
            onLanguageChange={() =>
              setFieldValue('languages', selectedLanguages)
            }
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Beskrivelse'
          subtitle='Den korte hjelpeteksten som oppsummerer hvordan feltet skal fylles ut'
        >
          <MultilingualInput
            name='description'
            component={TextAreaField}
            languages={selectedLanguages}
            value={values.description}
            error={errors.description}
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Versjon'
        isExpanded={allExpanded[1]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 1 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Versjon'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <TextField
            name='version'
            value={values.version}
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Endepunkt'
        required
        isExpanded={allExpanded[2]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 2 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Endepunkt URL'
          required
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <TextField
            name='endpointUrl'
            value={values.endpointUrl}
            error={isPublished && touched.endpointUrl && errors.endpointUrl}
            helperText={
              isPublished && touched.endpointUrl && errors.endpointUrl
            }
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Lenke til endepunktsbeskrivelse'
          subtitle={translations.dataProcessingAgreementsAbstract}
          description={translations.dataProcessingAgreementsDescription}
        >
          <FieldArray
            name='endpointDescriptions'
            render={({ push, remove }) => (
              <>
                {values.endpointDescriptions.map((description, index) => (
                  <Fragment key={`endpointDescriptions-${index}`}>
                    <TextField
                      placeholder='Ny endepunktsbeskrivelse'
                      name={`endpointDescriptions[${index}]`}
                      value={description}
                      onChange={handleChange}
                    />
                    {values.endpointDescriptions.length > 1 && (
                      <SC.RemoveButton
                        type='button'
                        onClick={() => remove(index)}
                      >
                        <RemoveIcon />
                        Slett endepunkt
                      </SC.RemoveButton>
                    )}
                  </Fragment>
                ))}
                <SC.AddButton
                  type='button'
                  addMargin={values.endpointDescriptions.length === 1}
                  onClick={() => push('')}
                >
                  <AddIcon />
                  Legg til nytt endepunkt
                </SC.AddButton>
              </>
            )}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Kontaktinformasjon'
        isExpanded={allExpanded[3]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 3 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Kontaktpunkt'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <TextField
            name='contact.name'
            value={values.contact.name}
            labelText='Navn'
            onChange={handleChange}
          />
          <TextField
            name='contact.url'
            value={values.contact.url}
            labelText='URL'
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Kontaktinformasjon'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <SC.InlineFields>
            <TextField
              name='contact.email'
              value={values.contact.email}
              labelText='E-post'
              onChange={handleChange}
            />
            <TextField
              name='contact.phone'
              value={values.contact.phone}
              labelText='Telefon'
              onChange={handleChange}
            />
          </SC.InlineFields>
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Format'
        isExpanded={allExpanded[4]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 4 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Mediatyper'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <FieldArray
            name='mediaTypes'
            render={({ push, remove }) => (
              <>
                <TextTagsSearchField
                  name='mediaTypes'
                  labelText='Velg blant registrerte mediatyper'
                  value={values.mediaTypes.map(mediaType => {
                    const match = mediaTypes?.find(
                      ({ code }) => mediaType === code
                    );
                    return {
                      label: match?.name,
                      value: match?.code
                    };
                  })}
                  suggestions={mediaTypesSuggestions.map(({ code, name }) => ({
                    label: name,
                    value: code
                  }))}
                  onChange={({
                    target: { value: query }
                  }: ChangeEvent<HTMLInputElement>) => {
                    if (query && mediaTypes) {
                      setIsWaitingForMediaTypesSuggestions(true);
                      setMediaTypesSuggestions(
                        mediaTypes
                          .filter(({ code, name }) => {
                            const match = values.mediaTypes.find(
                              mediaType => code === mediaType
                            );
                            return (
                              !match &&
                              (code.toLowerCase().includes(query) ||
                                name.toLowerCase().includes(query))
                            );
                          })
                          .slice(0, 5)
                      );
                      setIsWaitingForMediaTypesSuggestions(false);
                    }
                  }}
                  isLoadingSuggestions={isWaitingForMediaTypesSuggestions}
                  onAddTag={(tag: string) =>
                    !values.mediaTypes.includes(tag) && push(tag)
                  }
                  onRemoveTag={remove}
                />
                <TextTagsField
                  name='mediaTypes'
                  labelText='Oppgi evt. annen mediatype'
                  value={values.mediaTypes.filter(
                    mediaType =>
                      !mediaTypes?.find(({ code }) => mediaType === code)
                  )}
                  onAddTag={(tag: string) =>
                    !values.mediaTypes.includes(tag) && push(tag)
                  }
                  onRemoveTag={remove}
                />
              </>
            )}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Tilgang'
        isExpanded={allExpanded[5]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 5 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Kan alle få tilgang?'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <Radio
            name='access.isOpenAccess'
            value={values.access.isOpenAccess}
            options={[
              { label: 'Ja', value: true },
              { label: 'Nei', value: false }
            ]}
            onChange={handleBooleanRadioChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Er lisensen åpen?'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <Radio
            name='access.isOpenLicense'
            value={values.access.isOpenLicense}
            options={[
              { label: 'Ja', value: true },
              { label: 'Nei', value: false }
            ]}
            onChange={handleBooleanRadioChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Er API-et gratis å bruke?'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <Radio
            name='access.isFree'
            value={values.access.isFree}
            options={[
              { label: 'Ja', value: true },
              { label: 'Nei', value: false }
            ]}
            onChange={handleBooleanRadioChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Gir datatjenesten kilde til en autoritativ kilde?'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <Radio
            name='access.isAuthoritativeSource'
            value={values.access.isAuthoritativeSource}
            options={[
              { label: 'Ja', value: true },
              { label: 'Nei', value: false }
            ]}
            onChange={handleBooleanRadioChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Vilkår og begrensninger'
        isExpanded={allExpanded[6]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 6 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Trafikkbegrensninger'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <MultilingualInput
            name='termsAndConditions.usageLimitation'
            component={TextField}
            languages={selectedLanguages}
            value={values.termsAndConditions.usageLimitation}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Pris'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <MultilingualInput
            name='termsAndConditions.price'
            component={TextField}
            languages={selectedLanguages}
            value={values.termsAndConditions.price}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Kapasitet og ytelse'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <MultilingualInput
            name='termsAndConditions.capacityAndPerformance'
            component={TextField}
            languages={selectedLanguages}
            value={values.termsAndConditions.capacityAndPerformance}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Pålitelighet'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <MultilingualInput
            name='termsAndConditions.reliability'
            component={TextField}
            languages={selectedLanguages}
            value={values.termsAndConditions.reliability}
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Status'
        isExpanded={allExpanded[7]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 7 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Status på API-et'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <Select
            name='dataServiceStatus.statusText'
            value={values.dataServiceStatus.statusText}
            options={[
              {
                label: 'Under utprøving',
                value: StatusText.EXPERIMENTAL
              },
              {
                label: 'I produksjon',
                value: StatusText.STABLE
              },
              {
                label: 'Foreldet',
                value: StatusText.DEPRECATED
              },
              {
                label: 'Avviklet',
                value: StatusText.REMOVED
              }
            ]}
            isResettable
            noOptionLabel='Velg status'
            onChange={handleChange}
          />
          {/* <SC.DatePicker
            id='expiration-date-picker'
            name='dataServiceStatus.expirationDate'
            label='Utløpsdato'
            value={values.dataServiceStatus.expirationDate}
            format='dd.MM.yyyy'
            variant='inline'
            disableToolbar
            margin='normal'
            onChange={handleChange}
          /> */}
          <TextField
            name='dataServiceStatus.supersededByUrl'
            value={values.dataServiceStatus.supersededByUrl}
            labelText='Lenke til ny versjon av API-beskrivelsen'
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>

      <SC.DataServiceFormSection
        title='Tilknyttede datasettbeskrivelser'
        isExpanded={allExpanded[8]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 8 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Søk etter og velg datasettbeskrivelse(r)'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <FieldArray
            name='servesDataset'
            render={({ push, remove }) => (
              <TextTagsSearchField
                name='servesDataset'
                value={values.servesDataset.map(datasetUri => {
                  const match = datasets.find(({ uri }) => datasetUri === uri);
                  return {
                    label: translate(match?.title),
                    value: match?.uri
                  };
                })}
                onChange={({
                  target: { value: query }
                }: ChangeEvent<HTMLInputElement>) => {
                  if (query) {
                    setIsWaitingForDatasetSuggestions(true);
                    searchDatasets({ q: query, size: 5 });
                  }
                }}
                suggestions={datasetSuggestions.map(({ title, uri }) => ({
                  label: translate(title),
                  value: uri
                }))}
                isLoadingSuggestions={isWaitingForDatasetSuggestions}
                onAddTag={(tag: string) => {
                  const dataset = datasetSuggestions.find(
                    ({ uri }) => tag === uri
                  );
                  if (dataset && !values.servesDataset.includes(tag)) {
                    addDataset(dataset);
                    push(tag);
                  }
                }}
                onRemoveTag={remove}
              />
            )}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Standard (tjenestetype)'
        isExpanded={allExpanded[9]}
        onClick={() =>
          setAllExpanded(
            allExpanded.map((expanded, index) =>
              index === 9 ? !expanded : expanded
            )
          )
        }
      >
        <SC.Fieldset
          title='Tjenestetype'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <Select
            name='serviceType'
            value={values.serviceType}
            options={[
              {
                label: 'Kundeforhold',
                value: ServiceType.CUSTOMER_RELATIONS
              },
              {
                label: 'Kontoopplysninger',
                value: ServiceType.ACCOUNT_DETAILS
              }
            ]}
            isResettable
            noOptionLabel='Velg tjenestetype'
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
    </SC.DataServiceForm>
  );
};

export default compose<FC<any>>(
  memo,
  withDataService,
  withDatasets,
  withReferenceData,
  withFormik<Props, FormValues>({
    mapPropsToValues: ({ dataService }: Props) =>
      mapDataServiceToValues(dataService ?? {}),
    handleSubmit: () => {},
    validationSchema,
    displayName: 'DataServiceForm'
  })
)(DataServiceForm);
