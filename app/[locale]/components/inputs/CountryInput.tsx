import React from 'react';
import Select from 'react-select';
import { Country } from 'country-state-city';
import { useTranslations } from 'next-intl';

export type CountryValue = {
  country: any;
};

interface Props {
  value?: CountryValue;
  onChange: (value: CountryValue) => void;
}

const CountryInput: React.FC<Props> = ({ value, onChange }) => {
  const t = useTranslations('Index');

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  return (
    <div>
      <div>
        <label>{t('countryLabel')}</label>
        <Select
          value={value?.country}
          onChange={(option) => {
            onChange({
              country: option,
            });
          }}
          options={countryOptions}
          isSearchable
          isClearable
          placeholder={t('countrySelect')}
        />
      </div>
    </div>
  );
};

export default CountryInput;