import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

import area from "../../assets/newArea.json"

import "./AreaSelect.css"

interface Option {
    value: number;
    label: string;
    children?: Option[];
}

const options: Option[] = area as Option[]

const onChange: CascaderProps<Option>['onChange'] = (value) => {
    console.log(value);
};

const AreaSelect: React.FC = () => (
    <Cascader options={options} onChange={onChange} size='large' />
);

export default AreaSelect;