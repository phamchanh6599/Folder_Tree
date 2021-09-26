import './CButton.scss';
import React from 'react';
import { Button } from 'antd';

// Should be updated more in future in case we need more attributes
export type ButtonProps = {
  labelButton: string;
  type: 'default' | 'link' | 'text' | 'ghost' | 'primary' | 'dashed';
  size: 'large' | 'middle' | 'small';
  disabled?: boolean;
  style?: any;
  //   subbmit: () => void
};

export const CButton: React.FC<ButtonProps> = ({
  labelButton,
  size,
  type,
  disabled,
  style,
}) => {
  return (
    <>
      <Button style={style} disabled={!!disabled} type={type} size={size}>
        {labelButton}
      </Button>
    </>
  );
};
