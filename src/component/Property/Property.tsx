import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps } from 'antd';

import "./Property.css"

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['涉刑资产', '诉讼资产', '破产资产', '自行处置'];

const Property: React.FC = () => {
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: string[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    return (
        <div id="property-select">
            <span className='select-type'>资产类型</span>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                不限
            </Checkbox>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default Property;