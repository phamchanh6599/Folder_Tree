import './CopyData.scss';

import React, { useState, useCallback } from 'react';
import { Row, Col, Typography } from 'antd';

import { CSelect } from '../../core-components/CSelect/CSelect';
import { CButton } from '../../core-components/CButton/CButton';
import { FolderResults } from '../../components/FolderResults/FolderResults';

const { Title } = Typography;

export const CopyData: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = useCallback((value: string) => {
    console.log(`selected: ${value}`);
    if (value) setIsSelected(true);
  }, []);

  return (
    <Row className='CopyData'>
      <Col className='CopyData__container'>
        <Row>
          <Title level={4}>Copy Data to Folder</Title>
        </Row>

        {/* Select folder  */}
        <Col className='CopyData__form'>
          <Row>
            <CSelect
              placeHolder='Select Folder'
              onChange={handleChange}
              options={[
                {
                  value: 'My folder-1',
                  label: 'My folder-1',
                },
                {
                  value: 'My folder-2',
                  label: 'My folder-2',
                },
                {
                  value: 'My folder-3',
                  label: 'My folder-3',
                },
              ]}
            />
          </Row>

          {/* Tree Folder Results */}
          {isSelected && <FolderResults />}

          {/* Button  */}
          <Row justify='end' className='CopyData__button'>
            <CButton
              style={{
                marginRight: '10px',
              }}
              labelButton='CANCEL'
              size='middle'
              type='default'
            />
            <CButton labelButton='SAVE' size='middle' type='primary' />
          </Row>
        </Col>
      </Col>
    </Row>
  );
};
