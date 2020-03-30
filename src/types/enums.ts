export enum Status {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED'
}

export enum StatusText {
  EXPERIMENTAL = 'EXPERIMENTAL',
  STABLE = 'STABLE',
  DEPRECATED = 'DEPRECATED',
  REMOVED = 'REMOVED'
}

export enum ServiceType {
  CUSTOMER_RELATIONS = 'CUSTOMER_RELATIONS',
  ACCOUNT_DETAILS = 'ACCOUNT_DETAILS'
}

export enum SortOrder {
  ASC,
  DSC
}

export enum Language {
  NB = 'nb',
  NN = 'nn',
  EN = 'en'
}

export enum ImportMethod {
  URI = 'uri',
  FILE = 'file'
}

export enum AlertType {
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum KeyCode {
  TAB = 9,
  ENTER = 13,
  SPACE = 32,
  ARROW_UP = 38,
  ARROW_DOWN = 40
}
