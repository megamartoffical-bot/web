declare module 'react-select-country-list' {
  interface CountryOption {
    label: string;
    value: string;
  }
  
  interface CountryListObject {
    getData(): CountryOption[];
    getLabel(value: string): string;
    getValue(label: string): string;
  }
  
  function countryList(): CountryListObject;
  export default countryList;
}

