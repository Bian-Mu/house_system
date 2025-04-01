import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';

import area from "../../../../assets/newArea.json"

import "./AreaSelect.css"

interface Option {
    value: number;
    label: string;
    children?: Option[];
}

const options: Option[] = area as Option[]


interface AreaSelectProps {
    setReturnValue: Function
}

const AreaSelect: React.FC<AreaSelectProps> = ({ setReturnValue }) => {

    const onChange: CascaderProps<Option>['onChange'] = (value) => {
        // console.log(value);
        setReturnValue(value);
    };

    return (
        <div>
            <span className='select-type'>标的物所在地</span>
            <Cascader options={options} onChange={onChange} size='large' id="area-select" />
        </div>
    )

}

export default AreaSelect;