import './AddMoreFolder.scss';

import React, { useState } from 'react';
import {
  DeleteOutlined,
  SaveOutlined,
  FolderOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';

import { CSelect } from '../../core-components/CSelect/CSelect';

export type AddMoreFolderProps = {
  onCancel: () => void;
  onSave: (newFolder: any) => void;
};

export const AddMoreFolder: React.FC<AddMoreFolderProps> = ({
  onCancel,
  onSave,
}) => {
  const [isSelectUser, setIsSelectUser] = useState(false);
  const [form, setForm] = useState({
    title: '',
    visible: 'everyone',
  });
  const [listVisible, setListVisible] = useState('me');

  const handleOnChange = (name: 'title' | 'visible', value: string) => {
    if (name === 'visible' && value === 'specific') setIsSelectUser(true);
    else setIsSelectUser(false);

    form[name] = value;

    setForm({
      ...form,
    });
  };

  const handleSubmit = () => {
    if (!form.title) return;
    const customVisible =
      typeof listVisible === 'string' ? [listVisible] : listVisible;

    const newFolder = {
      title: form.title,
      key: form.title,
      children: [],
      visible: form.visible === 'specific' ? customVisible : [form.visible],
    };

    onSave(newFolder);
    onCancel();
  };

  return (
    <div className='AddMoreFolder'>
      {/* Form  */}
      <div className='AddMoreFolder__form'>
        <div className='AddMoreFolder__input'>
          <CaretRightOutlined
            style={{ fontSize: '30px', marginRight: '30px' }}
          />
          <FolderOutlined style={{ fontSize: '30px', marginRight: '10px' }} />
          <Input
            name='title'
            placeholder='Enter new folder'
            onChange={(e) => handleOnChange('title', e.target.value)}
          />
        </div>

        {/* Select visible type */}
        <div className='AddMoreFolder__select-visible'>
          <div>
            <CSelect
              defaultValue='everyone'
              onChange={(value) => handleOnChange('visible', value)}
              options={[
                {
                  label: 'Visible to Everyone',
                  value: 'everyone',
                },
                {
                  label: 'Visible to specific users',
                  value: 'specific',
                },
              ]}
            />
          </div>
        </div>

        {/* Select specific user  */}
        {isSelectUser && (
          <div className='AddMoreFolder__select-users'>
            <CSelect
              mode='multiple'
              defaultValue='me'
              onChange={(value) => setListVisible(value)}
              placeHolder='Select a person'
              options={[
                {
                  value: 'me',
                  label: 'Me',
                },
                {
                  value: 'luffy',
                  label: 'Luffy',
                },
                {
                  value: 'naruto',
                  label: 'Naruto',
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* Button */}
      <div className='AddMoreFolder__buttons'>
        <span onClick={onCancel} className='AddMoreFolder__cancel'>
          <DeleteOutlined style={{ fontSize: '30px', color: 'red' }} />
        </span>
        <span onClick={handleSubmit} className='AddMoreFolder__save'>
          <SaveOutlined style={{ fontSize: '30px', color: '#1BAE9F' }} />
        </span>
      </div>
    </div>
  );
};
