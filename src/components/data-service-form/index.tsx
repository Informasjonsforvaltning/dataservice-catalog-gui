import React, {
  FC,
  memo,
  // Fragment,
  useEffect,
  useRef,
  useState,
  ChangeEvent
} from 'react';
import { compose } from 'redux';
import { FormikProps, withFormik } from 'formik';
// import { FormikProps, withFormik, FieldArray } from 'formik';
import { compare, Operation } from 'fast-json-patch';

import {
  localization as translations,
  translate
} from '../../lib/localization';

// import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withDataService, {
  Props as DataServiceProps
} from '../with-data-service';

import TextField from '../field-text';
// import TextAreaField from '../field-text-area';
// import TextTagsField from '../field-text-tags';
// import TextTagsSearchField from '../field-text-tags-search';
import Radio from '../radio';
// import Checkbox from '../checkbox';
import Select from '../select';

import SC from './styled';

// import AddIcon from '../../images/icon-add.svg';
// import RemoveIcon from '../../images/icon-remove.svg';
import ExpandAllUpIcon from '../../images/expand-all-up.svg';
import ExpandAllDownIcon from '../../images/expand-all-down.svg';

import validationSchema from './validation-schema';

import { mapDataServiceToValues } from './utils';

import { DataService } from '../../types';
import { Status } from '../../types/enums';

interface Props extends DataServiceProps, FormikProps<DataService> {
  dataServiceStatus: Status;
  onTitleChange?: (title: string) => void;
  onStatusChange?: (status: Status) => void;
  onValidityChange?: (isValid: boolean) => void;
}

const DataServiceForm: FC<Props> = ({
  dataService,
  dataServiceStatus,
  // datasets,
  onTitleChange,
  // onStatusChange,
  onValidityChange,
  // datasetsActions: { fetchAllDatasetsRequested },
  dataServiceActions: { patchDataServiceRequested: patchDataService },
  values,
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

  useEffect(() => {
    // fetchAllDatasetsRequested(organizationId);
    mounted.current = true;
  }, []);

  const isMounted = mounted.current;
  const isDataServiceLoaded = dataServiceLoaded.current;
  const allFieldsExpanded = allExpanded.every(Boolean);
  // const isPublished = dataService?.status.statusText === Status.PUBLISHED;

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
        if (
          previousDataServiceStatus.statusText !==
          nextDataServiceStatus.statusText
        ) {
          setValues(dataServiceValues, true);
          previousDataService.current = dataServiceValues;
        }
      }
    }
  }, [dataService]);

  useEffect(() => {
    if (isMounted) {
      const previousDataServiceStatus = dataService?.status;
      const nextDataServiceStatus = { statusText: dataServiceStatus };
      if (
        previousDataServiceStatus?.statusText !==
        nextDataServiceStatus.statusText
      ) {
        const newValues = { ...values, status: nextDataServiceStatus };
        if (
          previousDataServiceStatus?.statusText === Status.DRAFT &&
          nextDataServiceStatus.statusText === Status.PUBLISHED
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
    if (isMounted && onValidityChange) {
      onValidityChange(isValid);
    }
  }, [values, isValid]);

  useEffect(() => {
    const validateAndSave = async () => {
      const diff: Operation[] = compare(previousDataService.current, values);
      const hasErrors = Object.keys(await validateForm(values)).length > 0;
      if (
        diff.length > 0 &&
        !(dataService?.status.statusText === Status.PUBLISHED && hasErrors)
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

  return (
    <SC.DataServiceForm>
      <SC.ExpandAllButton as='a' onClick={toggleAllExpanded}>
        <span>
          {allFieldsExpanded ? 'Lukk alle felter' : 'Åpne alle felter'}
        </span>
        {allFieldsExpanded ? <ExpandAllUpIcon /> : <ExpandAllDownIcon />}
      </SC.ExpandAllButton>
      <SC.DataServiceFormSection
        required
        title='Tittel og beskrivelse'
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
        >
          <TextField
            name='dataProcessorContactDetails.name'
            // value={values.dataProcessorContactDetails.name}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Beskrivelse'
          subtitle='Den korte hjelpeteksten som oppsummerer hvordan feltet skal fylles ut'
        >
          <TextField
            name='dataProcessorContactDetails.name'
            // value={values.dataProcessorContactDetails.name}
            onChange={handleChange}
          />
        </SC.Fieldset>
        {/* <SC.Fieldset
          title='Felles databehandlingsansvar'
          subtitle={localization.commonDataControllerContactAbstract}
          description={localization.commonDataControllerContactDescription}
        >
          <TextField
            name='commonDataControllerContact.companies'
            value={values.commonDataControllerContact.companies}
            labelText='Virksomheter som har felles databehandlingsansvar'
            onChange={handleChange}
          />
          <TextField
            name='commonDataControllerContact.distributionOfResponsibilities'
            value={
              values.commonDataControllerContact.distributionOfResponsibilities
            }
            labelText='Ansvarsfordeling'
            onChange={handleChange}
          />
          <FieldArray
            name='commonDataControllerContact.contactPoints'
            render={arrayHelpers => (
              <>
                {(values.commonDataControllerContact.contactPoints || []).map(
                  ({ name, email, phone }, index) => (
                    <Fragment
                      key={`commonDataControllerContact.contactPoints-${index}`}
                    >
                      <TextField
                        name={`commonDataControllerContact.contactPoints[${index}].name`}
                        value={name}
                        labelText='Kontaktpunkt'
                        onChange={handleChange}
                      />
                      <SC.InlineFields>
                        <TextField
                          name={`commonDataControllerContact.contactPoints[${index}].email`}
                          value={email}
                          labelText='E-post'
                          onChange={handleChange}
                        />
                        <TextField
                          name={`commonDataControllerContact.contactPoints[${index}].phone`}
                          value={phone}
                          labelText='Telefon'
                          onChange={handleChange}
                        />
                      </SC.InlineFields>
                      {(values.commonDataControllerContact.contactPoints || [])
                        .length > 1 && (
                        <SC.RemoveButton
                          type='button'
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <RemoveIcon />
                          Slett kontaktpunkt
                        </SC.RemoveButton>
                      )}
                    </Fragment>
                  )
                )}
                <SC.AddButton
                  type='button'
                  addMargin={
                    (values.commonDataControllerContact.contactPoints || [])
                      .length === 1
                  }
                  onClick={() =>
                    arrayHelpers.push({
                      name: '',
                      email: '',
                      phone: ''
                    })
                  }
                >
                  <AddIcon />
                  Legg til nytt kontaktpunkt
                </SC.AddButton>
              </>
            )}
          />
        </SC.Fieldset> */}
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
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>
      <SC.DataServiceFormSection
        title='Endepunkt'
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
          title='Endepunkt'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <TextField
            name='endpoint'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Lenke til endepunktbeskrivelse'
          subtitle={translations.dataProcessingAgreementsAbstract}
          description={translations.dataProcessingAgreementsDescription}
        >
          {/* TODO: ADD INITIAL CASE? */}
          {/* <FieldArray
            name='endpointDescriptionUrls'
            render={arrayHelpers => (
              <>
                {values.endpointDescriptionUrls.map((descriptionUrl, index) => (
                  <Fragment key={`endpointDescriptionUrls-${index}`}>
                    <TextField
                      placeholder='Ny endepunktbeskrivelse'
                      name={`endpointDescriptionUrls[${index}]`}
                      value={descriptionUrl}
                      onChange={handleChange}
                    />
                    {values.endpointDescriptionUrls.length > 1 && (
                      <SC.RemoveButton
                        type='button'
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <RemoveIcon />
                        Slett beskrivelse
                      </SC.RemoveButton>
                    )}
                  </Fragment>
                ))}
                <SC.AddButton
                  type='button'
                  addMargin={values.endpointDescriptionUrls.length === 1}
                  onClick={() => arrayHelpers.push([])}
                >
                  <AddIcon />
                  Legg til ny beskrivelse
                </SC.AddButton>
              </>
            )}
          /> */}
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
            name='version'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
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
              name='version'
              labelText='E-post'
              // value={values.title}
              // error={isPublished && touched.title && errors.title}
              // helperText={isPublished && touched.title && errors.title}
              onChange={handleChange}
            />
            <TextField
              name='version'
              labelText='Telefon'
              // value={values.title}
              // error={isPublished && touched.title && errors.title}
              // helperText={isPublished && touched.title && errors.title}
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
          <TextField
            name='mediatyper'
            labelText='Velg blant registrerte mediatyper'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
          <TextField
            name='mediatyper'
            labelText='Oppgi evt. annen mediatype'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
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
            name='tilgang'
            value={false}
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
            name='lisens'
            value={false}
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
            name='gratis'
            value={false}
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
            name='autoritativ'
            value={false}
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
          <TextField
            name='trafikkbegrensninger'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Standard'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <TextField
            name='standard'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Kapasitet og ytelse'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <TextField
            name='kapasitet'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Pålitelighet'
          subtitle={translations.titleAbstract}
          description={translations.titleDescription}
        >
          <TextField
            name='paalitelighet'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
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
            name='status'
            options={[
              {
                label: 'Utkast',
                value: 'DRAFT'
              },
              {
                label: 'Publisert',
                value: 'PUBLISHED'
              }
            ]}
            noOptionLabel='Velg status'
            onChange={handleChange}
          />
          <TextField
            name='utlopsdato'
            labelText='Utløpsdato'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
          <TextField
            name='nyttapi'
            labelText='Lenke til ny versjon av API-beskrivelsen'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
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
          <TextField
            name='version'
            // value={values.title}
            // error={isPublished && touched.title && errors.title}
            // helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>

      <SC.DataServiceFormSection
        title='Standarder (tjenestetype)'
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
            name='tjenestetype'
            options={[]}
            noOptionLabel='Velg tjenestetype'
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection>

      {/* <SC.DataServiceFormSection
        required
        title='Behandlingsaktiviteter'
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
          required
          title='Behandlingen gjelder'
          subtitle={localization.titleAbstract}
          description={localization.titleDescription}
        >
          <TextField
            name='title'
            value={values.title}
            error={isPublished && touched.title && errors.title}
            helperText={isPublished && touched.title && errors.title}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Formålet med behandlingsaktivitetene'
          subtitle={localization.purposeAbstract}
          description={localization.purposeDescription}
        >
          <TextAreaField
            name='purpose'
            value={values.purpose}
            error={isPublished && touched.purpose && errors.purpose}
            helperText={isPublished && touched.purpose && errors.purpose}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Kategorier av registrerte'
          subtitle={localization.dataSubjectCategoriesAbstract}
          description={localization.dataSubjectCategoriesDescription}
        >
          <FieldArray
            name='dataSubjectCategories'
            render={arrayHelpers => (
              <TextTagsField
                name='dataSubjectCategories'
                value={values.dataSubjectCategories}
                error={
                  isPublished &&
                  touched.dataSubjectCategories &&
                  errors.dataSubjectCategories
                }
                helperText={
                  isPublished &&
                  touched.dataSubjectCategories &&
                  errors.dataSubjectCategories
                }
                onAddTag={(tag: string) => {
                  arrayHelpers.push(tag);
                  setFieldTouched('dataSubjectCategories', true, true);
                }}
                onRemoveTag={(index: number) => {
                  arrayHelpers.remove(index);
                  setFieldTouched('dataSubjectCategories', true, true);
                }}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Behandlingsgrunnlag etter artikkel 6'
          subtitle={localization.articleSixBasisAbstract}
          description={localization.articleSixBasisDescription}
        >
          <FieldArray
            name='articleSixBasis'
            render={arrayHelpers => (
              <>
                {(values.articleSixBasis || []).map(
                  ({ legality, referenceUrl }, index) => (
                    <Fragment key={`articleSixBasis-${index}`}>
                      <Select
                        name={`articleSixBasis[${index}].legality`}
                        value={legality}
                        options={[
                          {
                            label:
                              'Artikkel 6.1.a - Den registrerte har samtykket til behandling av sine personopplysninger for ett eller flere spesifikke formål',
                            value: '6.1.a'
                          },
                          {
                            label:
                              'Artikkel 6.1.b - Behandlingen er nødvendig for å oppfylle en avtale som den registrerte er part i, eller for å gjennomføre tiltak på den registrertes anmodning før en avtaleinngåelse',
                            value: '6.1.b'
                          },
                          {
                            label:
                              'Artikkel 6.1.c - Behandlingen er nødvendig for å oppfylle en rettslig forpliktelse som påhviler den behandlingsansvarlige',
                            value: '6.1.c'
                          },
                          {
                            label:
                              'Artikkel 6.1.d - Behandlingen er nødvendig for å verne den registrertes eller en annen fysisk persons vitale interesser',
                            value: '6.1.d'
                          },
                          {
                            label:
                              'Artikkel 6.1.e - Behandlingen er nødvendig for å utføre en oppgave i allmennhetens interesse eller utøve offentlig myndighet som den behandlingsansvarlige er pålagt',
                            value: '6.1.e'
                          },
                          {
                            label:
                              'Artikkel 6.1.f - Behandlingen er nødvendig for formål knyttet til de berettigede interessene som forfølges av den behandlingsansvarlige eller en tredjepart, med mindre den registrertes interesser eller grunnleggende rettigheter og friheter går foran og krever vern av personopplysninger, særlig dersom den registrerte er et barn',
                            value: '6.1.f'
                          }
                        ]}
                        labelText='Behandlingens lovlighet'
                        noOptionLabel='Velg artikkel fra listen'
                        onChange={handleChange}
                      />
                      {['6.1.a', '6.1.b'].includes(legality) && (
                        <TextField
                          name={`articleSixBasis[${index}].referenceUrl`}
                          value={referenceUrl}
                          labelText='Henvisning til rettslig forpliktelse, berettighet, interesse mv'
                          onChange={handleChange}
                        />
                      )}
                      {(values.articleSixBasis || []).length > 1 && (
                        <SC.RemoveButton
                          type='button'
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <RemoveIcon />
                          Slett behandlingsgrunnlag
                        </SC.RemoveButton>
                      )}
                    </Fragment>
                  )
                )}
                <SC.AddButton
                  type='button'
                  addMargin={(values.articleSixBasis || []).length === 1}
                  onClick={() =>
                    arrayHelpers.push({
                      legality: '',
                      referenceUrl: ''
                    })
                  }
                >
                  <AddIcon />
                  Legg til nytt behandlingsgrunnlag
                </SC.AddButton>
              </>
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Behandlingsgrunnlag etter artikkel 9 eller 10'
          subtitle={localization.otherArticlesAbstract}
        >
          <Checkbox
            name='otherArticles.articleNine.checked'
            checked={!!values.otherArticles?.articleNine?.checked}
            labelText='Artikkel 9 - Behandling av særlige kategorier av personopplysninger'
            onChange={handleChange}
          />
          {values.otherArticles?.articleNine?.checked && (
            <TextField
              name='otherArticles.articleNine.referenceUrl'
              value={values.otherArticles?.articleNine?.referenceUrl ?? ''}
              labelText='Henvisning til annen lovgivning, dersom relevant'
              onChange={handleChange}
            />
          )}
          <Checkbox
            name='otherArticles.articleTen.checked'
            checked={!!values.otherArticles?.articleTen?.checked}
            labelText='Artikkel 10 - Behandling av personopplysninger om straffedommer og lovovertredelser'
            onChange={handleChange}
          />
          {values.otherArticles?.articleTen?.checked && (
            <TextField
              name='otherArticles.articleTen.referenceUrl'
              value={values.otherArticles?.articleTen?.referenceUrl ?? ''}
              labelText='Henvisning til annen lovgivning, dersom relevant'
              onChange={handleChange}
            />
          )}
        </SC.Fieldset>
        <SC.Fieldset
          title='Funksjonsområde behandlingen faller inn under'
          subtitle={localization.businessAreasAbstract}
          description={localization.businessAreasDescription}
        >
          <FieldArray
            name='businessAreas'
            render={arrayHelpers => (
              <TextTagsField
                name='businessAreas'
                value={values.businessAreas}
                onAddTag={(tag: string) => arrayHelpers.push(tag)}
                onRemoveTag={(index: number) => arrayHelpers.remove(index)}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Tilhørende datasett'
          subtitle={localization.relatedDatasetsAbstract}
          description={localization.relatedDatasetsDescription}
        >
          <FieldArray
            name='relatedDatasets'
            render={arrayHelpers => (
              <TextTagsSearchField
                name='relatedDatasets'
                value={values.relatedDatasets.map(id => {
                  return {
                    label:
                      datasets.find(
                        ({ id: datasetId }: Dataset) => datasetId === id
                      )?.title[localization.getLanguage()] ?? '',
                    value: id
                  };
                })}
                onChange={({
                  target: { value: query }
                }: ChangeEvent<HTMLInputElement>) => {
                  if (query) {
                    setIsWaitingForSuggestions(true);
                    setDatasetSuggestions(
                      datasets
                        .filter(
                          ({ id, registrationStatus, title }) =>
                            [
                              DatasetStatus.APPROVE,
                              DatasetStatus.PUBLISH
                            ].includes(registrationStatus) &&
                            !values.relatedDatasets.includes(id) &&
                            (Object.values(
                              title
                            ) as string[]).some((localTitle: string): boolean =>
                              localTitle
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            )
                        )
                        .slice(0, 5)
                    );
                    setIsWaitingForSuggestions(false);
                  }
                }}
                placeholder={localization.relatedDatasetsPlaceholder}
                isLoadingSuggestions={isWaitingForSuggestions}
                suggestions={datasetSuggestions.map(({ id: value, title }) => ({
                  label: title[localization.getLanguage()],
                  value
                }))}
                onAddTag={(tag: string) => arrayHelpers.push(tag)}
                onRemoveTag={(index: number) => arrayHelpers.remove(index)}
              />
            )}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection> */}
      {/* <SC.DataServiceFormSection
        required
        title='Personopplysninger'
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
          required
          title='Kategorier av personopplysninger'
          subtitle={localization.personalDataCategoriesAbstract}
          description={localization.personalDataCategoriesDescription}
        >
          <FieldArray
            name='personalDataCategories'
            render={arrayHelpers => (
              <TextTagsField
                name='personalDataCategories'
                value={values.personalDataCategories}
                error={
                  isPublished &&
                  touched.personalDataCategories &&
                  errors.personalDataCategories
                }
                helperText={
                  isPublished &&
                  touched.personalDataCategories &&
                  errors.personalDataCategories
                }
                onAddTag={(tag: string) => {
                  arrayHelpers.push(tag);
                  setFieldTouched('personalDataCategories', true, true);
                }}
                onRemoveTag={(index: number) => {
                  arrayHelpers.remove(index);
                  setFieldTouched('personalDataCategories', true, true);
                }}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Generell beskrivelse av tekniske og organisatoriske sikkerhetstiltak'
          subtitle={localization.securityMeasuresAbstract}
        >
          <TextAreaField
            name='securityMeasures'
            value={values.securityMeasures}
            error={
              isPublished && touched.securityMeasures && errors.securityMeasures
            }
            helperText={
              isPublished && touched.securityMeasures && errors.securityMeasures
            }
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Planlagte tidsfrister for sletting'
          subtitle={localization.plannedDeletionAbstract}
        >
          <TextAreaField
            name='plannedDeletion'
            value={values.plannedDeletion}
            error={
              isPublished && touched.plannedDeletion && errors.plannedDeletion
            }
            helperText={
              isPublished && touched.plannedDeletion && errors.plannedDeletion
            }
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Kan behandlingen innebære høy personvernrisiko?'
          subtitle={localization.highPrivacyRiskAbstract}
        >
          <Radio
            name='highPrivacyRisk'
            value={values.highPrivacyRisk}
            options={[
              { label: 'Nei', value: false },
              { label: 'Ja', value: true }
            ]}
            onChange={handleBooleanRadioChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Er det gjennomført risikovurdering?'
          subtitle={localization.dataProtectionImpactAssessmentAbstract}
        >
          <Radio
            name='dataProtectionImpactAssessment.conducted'
            value={values.dataProtectionImpactAssessment.conducted}
            options={[
              { label: 'Nei', value: false },
              { label: 'Ja', value: true }
            ]}
            onChange={handleBooleanRadioChange}
          />
          {values.dataProtectionImpactAssessment.conducted && (
            <TextField
              name='dataProtectionImpactAssessment.assessmentReportUrl'
              value={values.dataProtectionImpactAssessment.assessmentReportUrl}
              labelText='Lenke til risikovurdering'
              onChange={handleChange}
            />
          )}
        </SC.Fieldset>
        <SC.Fieldset
          title='Kilder til personopplysningene'
          subtitle={localization.personalDataSubjectsAbstract}
          description={localization.personalDataSubjectsDescription}
        >
          <TextField
            name='personalDataSubjects'
            value={values.personalDataSubjects}
            onChange={handleChange}
          />
        </SC.Fieldset>
        <SC.Fieldset
          title='Systemer i din virksomhet som behandler personopplysningene'
          subtitle={localization.privacyProcessingSystemsAbstract}
          description={localization.privacyProcessingSystemsDescription}
        >
          <TextField
            name='privacyProcessingSystems'
            value={values.privacyProcessingSystems}
            onChange={handleChange}
          />
        </SC.Fieldset>
      </SC.DataServiceFormSection> */}
      {/* <SC.DataServiceFormSection
        required
        title='Overføring av personopplysningene'
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
          required
          title='Kategorier av mottakere'
          subtitle={localization.recipientCategoriesAbstract}
          description={localization.recipientCategoriesDescription}
        >
          <FieldArray
            name='recipientCategories'
            render={arrayHelpers => (
              <TextTagsField
                name='recipientCategories'
                value={values.recipientCategories}
                error={
                  isPublished &&
                  touched.recipientCategories &&
                  errors.recipientCategories
                }
                helperText={
                  isPublished &&
                  touched.recipientCategories &&
                  errors.recipientCategories
                }
                onAddTag={(tag: string) => {
                  arrayHelpers.push(tag);
                  setFieldTouched('recipientCategories', true, true);
                }}
                onRemoveTag={(index: number) => {
                  arrayHelpers.remove(index);
                  setFieldTouched('recipientCategories', true, true);
                }}
              />
            )}
          />
        </SC.Fieldset>
        <SC.Fieldset
          required
          title='Overføres personopplysningene til tredjeland?'
          subtitle={localization.transferredAbstract}
        >
          <Radio
            name='dataTransfers.transferred'
            value={values.dataTransfers.transferred}
            options={[
              { label: 'Nei', value: false },
              { label: 'Ja', value: true }
            ]}
            error={
              isPublished &&
              touched.dataTransfers?.transferred &&
              errors.dataTransfers?.transferred
            }
            helperText={
              isPublished &&
              touched?.dataTransfers?.transferred &&
              errors?.dataTransfers?.transferred
            }
            onChange={handleBooleanRadioChange}
          />
          {values.dataTransfers.transferred && (
            <TextField
              name='dataTransfers.thirdCountryRecipients'
              value={values.dataTransfers.thirdCountryRecipients}
              labelText='Oppgi hvilke(t) tredjeland personopplysningene overføres til'
              error={
                isPublished &&
                touched.dataTransfers?.thirdCountryRecipients &&
                errors.dataTransfers?.thirdCountryRecipients
              }
              helperText={
                isPublished &&
                touched?.dataTransfers?.thirdCountryRecipients &&
                errors?.dataTransfers?.thirdCountryRecipients
              }
              onChange={handleChange}
            />
          )}
        </SC.Fieldset>
        {values.dataTransfers.transferred && (
          <SC.Fieldset
            title='Nødvendige garantier ved overføring til tredjeland eller internasjonale organisasjoner'
            subtitle={localization.guaranteesAbstract}
          >
            <TextField
              name='dataTransfers.guarantees'
              value={values.dataTransfers.guarantees}
              error={
                isPublished &&
                touched.dataTransfers?.guarantees &&
                errors.dataTransfers?.guarantees
              }
              helperText={
                isPublished &&
                touched?.dataTransfers?.guarantees &&
                errors?.dataTransfers?.guarantees
              }
              onChange={handleChange}
            />
          </SC.Fieldset>
        )}
      </SC.DataServiceFormSection> */}
    </SC.DataServiceForm>
  );
};

export default compose<FC<any>>(
  memo,
  withDataService,
  withFormik<Props, DataService>({
    mapPropsToValues: ({ dataService }: Props) =>
      mapDataServiceToValues(dataService ?? {}),
    handleSubmit: () => {},
    validationSchema,
    displayName: 'DataServiceForm'
  })
)(DataServiceForm);