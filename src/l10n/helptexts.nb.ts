export const helptextsNb = {
  accessRights: {
    abstract:
      'Skal gjenspeile det mest begrensede feltet/opplysningen i APIet.',
    description: `“Offentlig” betyr at datasettet ikke inneholder begrensede opplysninger og kan legges ut som åpne data, selv om det ikke er laget en løsning for tilgang. Se Difis veileder for åpne data.
    “Begrenset offentlighet” betyr at tilgangen til opplysningene avhenger av hvilket formål opplysningene er innsamlet til, og hvilken lovhjemmel den som skal bruke dataene har. Begrensningen kan skyldes innhold som personopplysninger. Når noen ønsker å benytte datasettet må man foreta en konkret vurdering av tilgangen.
    “Unntatt offentlighet” betyr at saksbehandler, med referanse til lov eller forskrift, har valgt at datasettet kan unndras fra offentlighet. Typiske eksempler er interne dokumenter, styringsdialog, ansettelser, gradert informasjon, forretningshemmeligheter eller data som andre eier.
    Se spesifikasjonen <a href='https://data.norge.no/specification/dcat-ap-no/#Datasett-tilgangsniv%C3%A5' target='_blank'><span>Datasett: tilgangsnivå</span><i class="fa fa-external-link fdk-fa-right"></i></a>`
  },

  title: {
    abstract: 'Tittelen skal vær kortfattet, kunne stå alene og gi mening.',
    description: ''
  },

  description: {
    abstract:
      'Beskrivelsen skal være kortfattet. Det bør fremgå hva datatjenesten gjør.',
    description: ''
  },

  version: {
    abstract: 'Angi hvilken versjon av spesifikasjonsfilen som brukes.',
    description: ''
  },

  endpointUrl: {
    abstract: 'Rotplassering eller primært endepunkt for tjenesten (en IRI)',
    description: ''
  },

  endpointDescriptions: {
    abstract:
      'Legg til lenke til datatjenesten sin spesifikasjon. F.eks OAS, Swagger, GraphQL eller lignende.',
    description:
      'Denne egenskapen inneholder en beskrivelse av tjenestene som er tilgjengelige via endepunktene, inkludert deres operasjoner, parametere osv. Egenskapen gir spesifikke detaljer om de faktiske endepunkt-instansene, mens dct:conformsTo brukes til å indikere den generelle standarden eller spesifikasjonen som endepunktene implementerer.'
  },

  contactName: {
    abstract:
      'Kontaktpunkt kan være navnet til en gruppe, avdeling, seksjon eller lignende i organisasjonen. Skal ikke være enkeltpersoner.',
    description: ''
  },

  contactUrl: {
    abstract: '',
    description: ''
  },

  contactEmail: {
    abstract: '',
    description: ''
  },

  contactPhone: {
    abstract: '',
    description: ''
  },

  landingPage: {
    abstract: 'Landingsside til datatjenesten (en URI)',
    description: ''
  },

  page: {
    abstract: 'Legg til lenke til datatjenesten sin dokumentasjon',
    description: ''
  },

  keywords: {
    abstract:
      'Sentralt innhold i datasettet som ennå ikke har begrepsdefinisjoner.',
    description: `I noen tilfeller mangler noen av begrepsdefinisjonene som er sentrale for å beskrive datasettet, eller man har et ord som ikke formelt forbindes med datasettet, men som man vet at mange likevel bruker. Da kan dette feltet brukes til å sørge for at disse søkeordene likevel gir treff i søkemotoren, som f. eks. ord og uttrykk som beskriver sentralt innhold i datasettet. Se spesifikasjonen <a href='https://data.norge.no/specification/dcat-ap-no/#Datasett-emneord' target='_blank'><span>Datasett: emneord</span><i class="fa fa-external-link fdk-fa-right"></i></a>`
  },

  license: {
    abstract:
      'Dersom distribusjonen har åpne, offentlige data skal lisens oppgis.',
    description: ''
  },

  mediaTypes: {
    abstract: 'Velg format(er) fra IANAs liste over offisielle medietyper.',
    description:
      'Skriv inn format og avlsutt med TAB eller Enter. Vi anbefaler at du bruker de samme formatbeskrivelsene som du finner i lenken nedenfor. (Obs: Du må selv kopiere over formatet fra listen.) Lenke til IANAs liste over offisielle medietyper: <a href="http://www.iana.org/assignments/media-types/media-types.xhtml">http://www.iana.org/assignments/media-types/media-types.xhtml</a>'
  },

  isOpenAccess: {
    abstract: 'Kan hvem som hel',
    description: ''
  },

  isOpenLicense: {
    abstract: '',
    description: ''
  },

  isFree: {
    abstract: '',
    description: ''
  },

  isAuthoritativeSource: {
    abstract: '',
    description: ''
  },

  usageLimitation: {
    abstract: 'Begrensninger på antall kall til API e.l. per bruker.',
    description: ''
  },

  capacityAndPerformance: {
    abstract:
      'Oppgi responstiden til API-et. Typisk angitt i ms. Er det begrensinger på antall samtidige brukere?',
    description: ''
  },

  reliability: {
    abstract: 'Oppgi oppetiden til API-et.',
    description: ''
  },

  price: {
    abstract:
      'Kostnader forbundet med å bruke API-et. Transaksjonskostnader, abonnement e.l.',
    description: ''
  },

  status: {
    abstract:
      'Velg passende status og sett en dato når datatjenesten ikke lenger skal være tilgjengelig',
    description:
      'Forklaring på statuser \n : Under utprøving: Før API-et er produksjonssatt og åpen for generell bruk (utvikling, test, pilot etc). \n I produksjon: Når API-et er satt i produksjon. \n Foreldet: Bruk av API-et frarådes. API-et er kanskje erstattet av et annet. API, og kan bli avviklet. \n Avviklet: API-et er ikke lenger tilgjengelig.'
  },

  servesDataset: {
    abstract:
      'Legg til en eller flere datasettbeskrivelse(r) som er tilknyttet API-et.',
    description: ''
  },

  serviceType: {
    abstract: '',
    description: ''
  },

  type: {
    abstract: 'Søk etter begrepet som identifiserer datatjenestens type.',
    description: ''
  }
};
