import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import { useTranslations } from 'next-intl';

export type CountryStateCityValue = {
  country: any;
  state: any;
  city: any;
};

interface Props {
  value?: CountryStateCityValue;
  onChange: (value: CountryStateCityValue) => void;
}

const CountryStateCityInput: React.FC<Props> = ({ value, onChange }) => {
  const t = useTranslations('Index');

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    if (value && value.country) {
      setStates(State.getStatesOfCountry(value.country.value));
    }
  }, [value]);

  useEffect(() => {
    if (value && value.country && value.state) {
      setCities(City.getCitiesOfState(value.country.value, value.state.value));
    }
  }, [value]);

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
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
              state: null,
              city: null,
            });
          }}
          options={countryOptions}
          isSearchable
          isClearable
          placeholder={t('countrySelect')}
        />
      </div>

      <div className='pt-8'>
        <label>{t('stateLabel')}</label>
        <Select
          value={value?.state}
          onChange={(option) => {
            onChange({
              country: value?.country,
              state: option,
              city: null,
            });
          }}
          options={stateOptions}
          isSearchable
          isClearable
          placeholder={t('stateSelect')}
        />
      </div>

      <div className='pt-8'>
        <label>{t('cityLabel')}</label>
        <Select
          value={value?.city}
          onChange={(option) => {
            onChange({
              country: value?.country,
              state: value?.state,
              city: option,
            });
          }}
          options={cityOptions}
          isSearchable
          isClearable
          placeholder={t('citySelect')}
        />
      </div>
    </div>
  );
};

export default CountryStateCityInput;