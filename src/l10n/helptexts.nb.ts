export const helptextsNb = {
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

  mediaTypes: {
    abstract:
      'Velg format(er) fra IANAs liste over offisielle medietyper. Dersom formatet ikke finnes i listen kan du angi eget.',
    description:
      'Skriv inn format og avlsutt med TAB eller Enter. Vi anbefaler at du bruker de samme formatbeskrivelsene som du finner i lenken nedenfor. (Obs: Du må selv kopiere over formatet fra listen.) Lenke til IANAs liste over offisielle medietyper: http://www.iana.org/assignments/media-types/media-types.xhtml'
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
  }
};
