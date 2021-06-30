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

import { authService } from '../../services/auth-service';

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
import DateField from '../field-date';
import TextAreaField from '../field-text-area';
import TextTagsField from '../field-text-tags';
import TextTagsSearchField from '../field-text-tags-search';
import TextTagsArrayField from '../field-text-tags-array';
import Radio from '../radio';
import Select from '../select';

import SC from './styled';

import AddIcon from '../../images/icon-add.svg';
import RemoveIcon from '../../images/icon-remove.svg';
import ExpandAllUpIcon from '../../images/expand-all-up.svg';
import ExpandAllDownIcon from '../../images/expand-all-down.svg';

import validationSchema from './validation-schema';

import {
  mapDataServiceToValues,
  mapMultiLanguageTextArrayToMultiLanguageText,
  mapMultiLanguageTextToMultiLanguageTextArray
} from './utils';

import {
  DataService,
  Dataset,
  MediaType,
  MultiLanguageTextArray
} from '../../types';
import { Status, StatusText, ServiceType, Language } from '../../types/enums';
import DataServiceImportForm from '../data-service-import-form';

import 'react-datepicker/dist/react-datepicker.css';

interface FormValues extends DataService {
  languages?: Language[];
  keywordsTextArray: MultiLanguageTextArray;
}

interface Props
  extends DataServiceProps,
    DatasetsProps,
    ReferenceDataProps,
    FormikProps<FormValues> {
  dataServiceStatus: Status;
  organizationId: string;
  onTitleChange?: (title: string) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const DataServiceForm: FC<Props> = ({
  organizationId,
  dataService,
  dataServiceStatus,
  datasets,
  datasetSearchSuggestions,
  referenceData: { mediatypes: mediaTypes, openlicenses: openLicenses },
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
    getReferenceData('openlicenses');
    mounted.current = true;
  }, []);

  const isMounted = mounted.current;
  const isDataServiceLoaded = dataServiceLoaded.current;
  const allFieldsExpanded = allExpanded.every(Boolean);
  const isPublished = dataService?.status === Status.PUBLISHED;
  const isImported = !!dataService?.imported;
  const hasDatasets = !!dataService?.servesDataset?.length;
  const isReadOnly = authService.isReadOnlyUser(organizationId);

  const [languages, setLanguages] = useState({
    [Language.NB]: true,
    [Language.NN]: isReadOnly,
    [Language.EN]: isReadOnly
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

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setFieldValue(e.target.name, e.target.value, true);
  };

  const patch = (formValues: FormValues) => {
    formValues.keywords = mapMultiLanguageTextArrayToMultiLanguageText(
      formValues.keywordsTextArray
    );
    patchDataService(formValues);
  };

  const accessRightsOptions = [
    {
      label: 'Offentlig',
      value:
        'http://publications.europa.eu/resource/authority/access-right/PUBLIC'
    },
    {
      label: 'Begrenset offentlighet',
      value:
        'http://publications.europa.eu/resource/authority/access-right/RESTRICTED'
    },
    {
      label: 'Unntatt offentlighet',
      value:
        'http://publications.europa.eu/resource/authority/access-right/NON_PUBLIC'
    }
  ];

  const licenseOptions = isImported
    ? [{ label: values.license.name || '', value: values.license.url || '' }]
    : openLicenses
        ?.filter(({ isReplacedBy }) => !isReplacedBy)
        .map(({ uri, prefLabel: { no } }) => {
          return { label: no || '', value: uri };
        }) ?? [];

  useEffect(() => {
    if (isMounted) {
      const previousDataServiceStatus = dataService?.status;
      const nextDataServiceStatus = dataServiceStatus;
      if (previousDataServiceStatus !== nextDataServiceStatus) {
        const newValues = {
          ...values,
          organizationId,
          status: nextDataServiceStatus
        };
        if (
          previousDataServiceStatus === Status.DRAFT &&
          nextDataServiceStatus === Status.PUBLISHED
        ) {
          if (isValid) {
            patch(newValues);
          }
        } else {
          patch(newValues);
        }
      }
    }
  }, [dataServiceStatus]);

  useEffect(() => {
    if (dataService) {
      const dataServiceValues = {
        ...mapDataServiceToValues(dataService),
        languages: selectedLanguages,
        keywordsTextArray: mapMultiLanguageTextToMultiLanguageTextArray(
          dataService.keywords ?? []
        )
      };
      if (!isDataServiceLoaded) {
        if (hasDatasets) {
          getDatasets({
            filters: [
              {
                collection: { field: 'uri', values: dataService.servesDataset }
              }
            ]
          });
        }
        setValues(dataServiceValues, true);
        previousDataService.current = dataServiceValues;
        dataServiceLoaded.current = true;
      } else {
        const previousDataServiceStatus = dataService?.status;
        const nextDataServiceStatus = previousDataService.current.status;
        const previousDataServiceImported =
          previousDataService.current.imported;
        if (
          previousDataServiceStatus !== nextDataServiceStatus ||
          isImported !== previousDataServiceImported
        ) {
          setValues(dataServiceValues, true);
          previousDataService.current = dataServiceValues;
        }
      }
    }
  }, [dataService]);

  useEffect(() => {
    if (isMounted) {
      onValidityChange?.(isValid);
    }
  }, [values, isValid]);

  useEffect(() => {
    const validateAndSave = async () => {
      const diff: Operation[] = compare(
        { ...previousDataService.current, languages: selectedLanguages },
        { ...values, languages: selectedLanguages }
      );

      const formikErrors = await validateForm({
        ...values,
        languages: selectedLanguages
      });
      const hasErrors = Object.keys(formikErrors).length > 0;
      if (
        diff.length > 0 &&
        !(dataService?.status === Status.PUBLISHED && hasErrors)
      ) {
        patch({ ...values, organizationId });
      }
    };
    validateAndSave();
  }, [values]);

  useEffect(() => {
    if (onTitleChange) {
      onTitleChange(translate(values?.title)?.trim() || '');
    }
  }, [values?.title]);

  useEffect(() => {
    setDatasetSuggestions(datasetSearchSuggestions);
    setIsWaitingForDatasetSuggestions(false);
  }, [datasetSearchSuggestions]);

  return (
    <>
      {!isReadOnly && (
        <DataServiceImportForm
          dataServiceId={values.id}
          organizationId={organizationId}
        />
      )}
      <SC.DataServiceForm>
        {!isReadOnly && (
          <LanguagePicker
            languages={languages}
            toggleLanguage={toggleLanguage}
          />
        )}
        <SC.ExpandAllButton as='a' onClick={toggleAllExpanded}>
          <span>
            {allFieldsExpanded ? 'Lukk alle felter' : 'Åpne alle felter'}
          </span>
          {allFieldsExpanded ? <ExpandAllUpIcon /> : <ExpandAllDownIcon />}
        </SC.ExpandAllButton>
        <SC.DataServiceFormSection
          title='Tittel og beskrivelse'
          required
          isReadOnly={isReadOnly}
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
            subtitle={translations.title.abstract}
            required
            isReadOnly={isReadOnly}
          >
            <MultilingualInput
              name='title'
              component={TextField}
              languages={selectedLanguages}
              value={values.title}
              error={isPublished && touched.title && errors.title}
              helperText={isPublished && touched.title && errors.title}
              onChange={handleChange}
              disabled={isImported}
              isReadOnly={isReadOnly}
              onLanguageChange={() =>
                setFieldValue('languages', selectedLanguages)
              }
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Beskrivelse'
            subtitle={translations.description.abstract}
            isReadOnly={isReadOnly}
          >
            <MultilingualInput
              name='description'
              component={TextAreaField}
              languages={selectedLanguages}
              value={values.description}
              error={errors.description}
              onChange={handleChange}
              disabled={isImported}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Versjon'
          isReadOnly={isReadOnly}
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
            subtitle={translations.version.abstract}
            description={translations.version.description}
            isReadOnly={isReadOnly}
          >
            <TextField
              name='version'
              value={values.version}
              onChange={handleChange}
              disabled={isImported}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Endepunkt'
          required
          isReadOnly={isReadOnly}
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
            title='EndepunktURL'
            required
            subtitle={translations.endpointUrl.abstract}
            description={translations.endpointUrl.description}
            isReadOnly={isReadOnly}
          >
            <FieldArray
              name='endpointUrls'
              render={({ remove }) => (
                <>
                  {values.endpointUrls.map((url, index) => (
                    <Fragment key={`endpointUrls-${index}`}>
                      <TextField
                        placeholder='Ny endepunktsurl'
                        name={`endpointUrls[${index}]`}
                        value={url}
                        error={errors.endpointUrls}
                        onChange={handleChange}
                        disabled={isImported}
                        isReadOnly={isReadOnly}
                      />
                      {values.endpointUrls.length > 1 && !isReadOnly && (
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
                </>
              )}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Endepunktsbeskrivelse'
            subtitle={translations.endpointDescriptions.abstract}
            description={translations.endpointDescriptions.description}
            isReadOnly={isReadOnly}
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
                        error={errors.endpointDescriptions?.[index]}
                        onChange={handleChange}
                        disabled={isImported}
                        isReadOnly={isReadOnly}
                      />
                      {values.endpointDescriptions.length > 1 && !isReadOnly && (
                        <SC.RemoveButton
                          type='button'
                          onClick={() => remove(index)}
                        >
                          <RemoveIcon />
                          Slett endepunktsbeskrivelse
                        </SC.RemoveButton>
                      )}
                    </Fragment>
                  ))}
                  {!isReadOnly && (
                    <SC.AddButton
                      type='button'
                      addMargin={values.endpointDescriptions.length === 1}
                      onClick={() => push('')}
                    >
                      <AddIcon />
                      Legg til nytt endepunktsbeskrivelse
                    </SC.AddButton>
                  )}
                </>
              )}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Kontaktinformasjon'
          isReadOnly={isReadOnly}
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
            subtitle={translations.contactName.abstract}
            description={translations.contactName.description}
            isReadOnly={isReadOnly}
          >
            <TextField
              name='contact.name'
              value={values.contact.name}
              labelText='Navn'
              onChange={handleChange}
              disabled={isImported}
              isReadOnly={isReadOnly}
            />
            <TextField
              name='contact.url'
              value={values.contact.url}
              labelText='URL'
              onChange={handleChange}
              disabled={isImported}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Kontaktinformasjon'
            subtitle={translations.titleAbstract}
            description={translations.titleDescription}
            isReadOnly={isReadOnly}
          >
            <SC.InlineFields>
              <TextField
                name='contact.email'
                value={values.contact.email}
                labelText='E-post'
                onChange={handleChange}
                disabled={isImported}
                isReadOnly={isReadOnly}
              />
              <TextField
                name='contact.phone'
                value={values.contact.phone}
                labelText='Telefon'
                onChange={handleChange}
                disabled={isImported}
                isReadOnly={isReadOnly}
              />
            </SC.InlineFields>
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Landingsside og dokumentasjon'
          isReadOnly={isReadOnly}
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
            title='Landingsside'
            subtitle={translations.landingPage.abstract}
            description={translations.landingPage.description}
            isReadOnly={isReadOnly}
          >
            <>
              <TextField
                name='landingPage'
                value={values.landingPage}
                error={errors.landingPage}
                onChange={handleChange}
                isReadOnly={isReadOnly}
              />
            </>
          </SC.Fieldset>
          <SC.Fieldset
            title='Dokumentasjon'
            subtitle={translations.page.abstract}
            description={translations.page.description}
            isReadOnly={isReadOnly}
          >
            <FieldArray
              name='pages'
              render={({ push, remove }) => (
                <>
                  {values.pages.map((page, index) => (
                    <Fragment key={`page-${index}`}>
                      <TextField
                        placeholder='Ny dokumentasjon'
                        name={`pages[${index}]`}
                        value={page}
                        error={errors.pages?.[index]}
                        onChange={handleChange}
                        isReadOnly={isReadOnly}
                      />
                      {values.pages.length > 0 && !isReadOnly && (
                        <SC.RemoveButton
                          type='button'
                          onClick={() => remove(index)}
                        >
                          <RemoveIcon />
                          Slett dokumentasjon
                        </SC.RemoveButton>
                      )}
                    </Fragment>
                  ))}
                  {!isReadOnly && (
                    <SC.AddButton
                      type='button'
                      addMargin={values.pages.length === 1}
                      onClick={() => push('')}
                    >
                      <AddIcon />
                      Legg til ny dokumentasjon
                    </SC.AddButton>
                  )}
                </>
              )}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Søkeord'
          isReadOnly={isReadOnly}
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
            title='Søkeord'
            subtitle={translations.keywords.abstract}
            description={translations.keywords.description}
            isReadOnly={isReadOnly}
          >
            <MultilingualInput
              name='keywordsTextArray'
              value={values.keywordsTextArray}
              component={TextTagsArrayField}
              languages={selectedLanguages}
              error={errors.keywords}
              onChange={handleChange}
              disabled={isImported}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Lisens og tilgangsnivå'
          isReadOnly={isReadOnly}
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
            title='Lisens'
            subtitle={translations.license.abstract}
            description={translations.license.description}
            isReadOnly={isReadOnly}
          >
            <Select
              name='license.url'
              value={values.license.url}
              options={licenseOptions}
              isResettable
              noOptionLabel='Velg lisens'
              onChange={handleChange}
              isReadOnly={isReadOnly || isImported}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Tilgangsnivå'
            subtitle={translations.accessRights.abstract}
            description={translations.accessRights.description}
            isReadOnly={isReadOnly}
          >
            <SC.RadioColumn
              name='accessRights'
              value={values.accessRights}
              options={accessRightsOptions}
              onChange={handleRadioChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Format'
          isReadOnly={isReadOnly}
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
            title='Mediatyper'
            subtitle={translations.mediaTypes.abstract}
            description={translations.mediaTypes.description}
            isReadOnly={isReadOnly}
          >
            <FieldArray
              name='mediaTypes'
              render={({ push, remove }) => (
                <>
                  <TextTagsSearchField
                    name='mediaTypes'
                    labelText={
                      isReadOnly
                        ? 'Registrerte mediatyper'
                        : 'Velg blant registrerte mediatyper'
                    }
                    value={values.mediaTypes.map(mediaType => {
                      const match = mediaTypes?.find(
                        ({ code }) => mediaType === code
                      );
                      return {
                        label: match?.name,
                        value: match?.code
                      };
                    })}
                    suggestions={mediaTypesSuggestions.map(
                      ({ code, name }) => ({
                        label: name,
                        value: code
                      })
                    )}
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
                    isReadOnly={isReadOnly || isImported}
                  />
                  <TextTagsField
                    name='mediaTypes'
                    labelText={
                      isReadOnly
                        ? 'Andre mediatyper'
                        : 'Oppgi evt. annen mediatype'
                    }
                    value={values.mediaTypes.filter(
                      mediaType =>
                        !mediaTypes?.find(({ code }) => mediaType === code)
                    )}
                    onAddTag={(tag: string) =>
                      !values.mediaTypes.includes(tag) && push(tag)
                    }
                    onRemoveTag={remove}
                    isReadOnly={isReadOnly || isImported}
                  />
                </>
              )}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Tilgang'
          isReadOnly={isReadOnly}
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
            title='Kan alle få tilgang?'
            subtitle={translations.isOpenAccess.abstract}
            description={translations.isOpenAccess.description}
            isReadOnly={isReadOnly}
          >
            <Radio
              name='access.isOpenAccess'
              value={values.access.isOpenAccess}
              options={[
                { label: 'Ja', value: true },
                { label: 'Nei', value: false }
              ]}
              onChange={handleBooleanRadioChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Er lisensen åpen?'
            subtitle={translations.isOpenLicense.abstract}
            description={translations.isOpenLicense.description}
            isReadOnly={isReadOnly}
          >
            <Radio
              name='access.isOpenLicense'
              value={values.access.isOpenLicense}
              options={[
                { label: 'Ja', value: true },
                { label: 'Nei', value: false }
              ]}
              onChange={handleBooleanRadioChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Er API-et gratis å bruke?'
            subtitle={translations.isFree.abstract}
            description={translations.isFree.description}
            isReadOnly={isReadOnly}
          >
            <Radio
              name='access.isFree'
              value={values.access.isFree}
              options={[
                { label: 'Ja', value: true },
                { label: 'Nei', value: false }
              ]}
              onChange={handleBooleanRadioChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Gir datatjenesten kilde til en autoritativ kilde?'
            subtitle={translations.isAuthoritativeSource.abstract}
            description={translations.isAuthoritativeSource.description}
            isReadOnly={isReadOnly}
          >
            <Radio
              name='access.isAuthoritativeSource'
              value={values.access.isAuthoritativeSource}
              options={[
                { label: 'Ja', value: true },
                { label: 'Nei', value: false }
              ]}
              onChange={handleBooleanRadioChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Vilkår og begrensninger'
          isReadOnly={isReadOnly}
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
            title='Trafikkbegrensninger'
            subtitle={translations.usageLimitation.abstract}
            description={translations.usageLimitation.description}
            isReadOnly={isReadOnly}
          >
            <MultilingualInput
              name='termsAndConditions.usageLimitation'
              component={TextField}
              languages={selectedLanguages}
              value={values.termsAndConditions.usageLimitation}
              onChange={handleChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Pris'
            subtitle={translations.price.abstract}
            description={translations.price.description}
            isReadOnly={isReadOnly}
          >
            <MultilingualInput
              name='termsAndConditions.price'
              component={TextField}
              languages={selectedLanguages}
              value={values.termsAndConditions.price}
              onChange={handleChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Kapasitet og ytelse'
            subtitle={translations.capacityAndPerformance.abstract}
            description={translations.capacityAndPerformance.description}
            isReadOnly={isReadOnly}
          >
            <MultilingualInput
              name='termsAndConditions.capacityAndPerformance'
              component={TextField}
              languages={selectedLanguages}
              value={values.termsAndConditions.capacityAndPerformance}
              onChange={handleChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
          <SC.Fieldset
            title='Pålitelighet'
            subtitle={translations.reliability.abstract}
            description={translations.reliability.description}
            isReadOnly={isReadOnly}
          >
            <MultilingualInput
              name='termsAndConditions.reliability'
              component={TextField}
              languages={selectedLanguages}
              value={values.termsAndConditions.reliability}
              onChange={handleChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Status'
          isReadOnly={isReadOnly}
          isExpanded={allExpanded[10]}
          onClick={() =>
            setAllExpanded(
              allExpanded.map((expanded, index) =>
                index === 10 ? !expanded : expanded
              )
            )
          }
        >
          <SC.Fieldset
            title='Status på API-et'
            subtitle={translations.status.abstract}
            description={translations.status.description}
            isReadOnly={isReadOnly}
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
              isReadOnly={isReadOnly}
            />
            <DateField
              id='expiration-date-picker'
              name='dataServiceStatus.expirationDate'
              value={values.dataServiceStatus.expirationDate}
              labelText='Utløpsdato'
              placeholder={!isReadOnly ? 'Oppgi dato' : '-'}
              onChange={date => {
                setFieldValue(
                  'dataServiceStatus.expirationDate',
                  date?.toISOString().replace(/\.[0-9]{2,3}/, ''),
                  false
                );
              }}
              isReadOnly={isReadOnly}
            />
            <TextField
              name='dataServiceStatus.supersededByUrl'
              value={values.dataServiceStatus.supersededByUrl}
              labelText='Lenke til ny versjon av API-beskrivelsen'
              onChange={handleChange}
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Tilknyttede datasettbeskrivelser'
          isReadOnly={isReadOnly}
          isExpanded={allExpanded[11]}
          onClick={() =>
            setAllExpanded(
              allExpanded.map((expanded, index) =>
                index === 11 ? !expanded : expanded
              )
            )
          }
        >
          <SC.Fieldset
            title={
              isReadOnly
                ? 'Tilknyttede datasettbeskrivelser'
                : 'Søk etter og velg datasettbeskrivelse(r)'
            }
            subtitle={translations.servesDataset.abstract}
            description={translations.servesDataset.description}
            isReadOnly={isReadOnly}
          >
            <FieldArray
              name='servesDataset'
              render={({ push, remove }) => (
                <TextTagsSearchField
                  name='servesDataset'
                  value={values.servesDataset.map(datasetUri => {
                    const match = datasets.find(
                      ({ uri }) => datasetUri === uri
                    );
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
                      searchDatasets({ q: query });
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
                  isReadOnly={isReadOnly}
                />
              )}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
        <SC.DataServiceFormSection
          title='Standard (tjenestetype)'
          isReadOnly={isReadOnly}
          isExpanded={allExpanded[12]}
          onClick={() =>
            setAllExpanded(
              allExpanded.map((expanded, index) =>
                index === 12 ? !expanded : expanded
              )
            )
          }
        >
          <SC.Fieldset
            title='Tjenestetype'
            subtitle={translations.serviceType.abstract}
            description={translations.serviceType.description}
            isReadOnly={isReadOnly}
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
              isReadOnly={isReadOnly}
            />
          </SC.Fieldset>
        </SC.DataServiceFormSection>
      </SC.DataServiceForm>
    </>
  );
};

export default compose<FC<any>>(
  memo,
  withDataService,
  withDatasets,
  withReferenceData,
  withFormik<Props, FormValues>({
    mapPropsToValues: ({ dataService }: Props) => {
      return {
        ...mapDataServiceToValues(dataService ?? {}),
        keywordsTextArray: mapMultiLanguageTextToMultiLanguageTextArray(
          dataService?.keywords ?? []
        )
      };
    },
    handleSubmit: () => {},
    validationSchema,
    displayName: 'DataServiceForm'
  })
)(DataServiceForm);
