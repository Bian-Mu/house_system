import React, { useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

import "./Room.css"

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
    "一室一厅无卫",
    "一室一厅一卫",
    "两室一厅一卫",
    "两室两厅一卫",
    "两室两厅两卫",
    "三室一厅一卫",
    "三室一厅两卫",
    "三室两厅两卫",
    "四室两厅一卫",
    "四室两厅两卫",
    "其他"
];

interface RoomProps {
    setReturnValue: Function
}

const Room: React.FC<RoomProps> = ({ setReturnValue }) => {
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
        <div id="Room-select">
            <span className='select-type room-select-type'>户型</span>
            <Checkbox className='room-all-select' indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                <p>不限</p>
            </Checkbox>
            <CheckboxGroup className='room-too-much' options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    );
};

export default Room;