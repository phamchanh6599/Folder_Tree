import React from 'react';
import { Select } from 'antd';

// Should be updated more in future in case we need more attributes
type Options = {
  value: string | number;
  label: string;
};

type CSelectProps = {
  defaultValue?: string;
  options: Options[];
  placeHolder?: string;
  mode?: 'multiple' | 'tags' | undefined;
  onChange: (value: string) => void;
};

const { Option } = Select;

export const CSelect: React.FC<CSelectProps> = ({
  defaultValue,
  options,
  mode,
  placeHolder = '',
  onChange,
}) => {
  return (
    <>
      <Select
        style={{ width: '100%' }}
        size='middle'
        defaultValue={defaultValue}
        onChange={onChange}
        mode={mode}
        placeholder={placeHolder}
      >
        {options.map((item, idx) => (
          <Option key={idx} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    </>
  );
};
