import React from "react";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";
import { useTranslations } from "next-intl";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  const t = useTranslations("Index");

  return (
    <div style={{ position: "relative" }}>
      <Select
        placeholder={t("address")}
        isClearable
        options={getAll()}
        value={value}
        onChange={(val) => onChange(val as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNamePrefix="country-select"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#e3f8e0",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;