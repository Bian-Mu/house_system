import React, { useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

import "./Size.css"

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['[0,50)', '[50,100)', '[100,150)', '[150,200)', '[200,+)'];

interface SizeProps {
    setReturnValue: Function
}

const Size: React.FC<SizeProps> = ({ setReturnValue }) => {
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: string[]) => {
        setCheckedList(list);
        const codes = list.map(option => {
            const index = plainOptions.indexOf(option);
            return index + 1;
        });
        codes.length > 0 ? setReturnValue(codes) : setReturnValue([]);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        const isCheckedAll = e.target.checked;
        setCheckedList(isCheckedAll ? plainOptions : []);
        isCheckedAll ? setReturnValue([1, 2, 3, 4, 5]) : setReturnValue([]);
    };

    return (
        <div id="Size-select">
            <span className='select-type'>房屋面积（平方米）</span>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                不限
            </Checkbox>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default Size;