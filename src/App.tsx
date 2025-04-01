import './App.css'
import { Divider } from 'antd'
import AreaSelect from './component/House/Select/AreaSelect/AreaSelect'
import SubjectMatter from './component/House/Select/SujectMatter/SubjectMatter'
import Sort from './component/House/Sort/Sort'
import HouseList from './component/House/HouseList/HouseList'
import { useState } from 'react'
import Price from './component/House/Select/Price/Price'
import Size from './component/House/Select/Size/Size'
import Special from './component/House/Select/Special/Special'
import Room from './component/House/Select/Room/Room'
import Direction from './component/House/Select/Direction/Direction'
import Height from './component/House/Select/Height/Height'
import Renovation from './component/House/Select/Renovation/Renovation'

import transformArrayToSearchJson from './utils/search'

function App() {
  const [searchValue, setSearchValue] = useState<number[][]>([[], [], [], [], [], [], [], [], []]);

  const onClick = () => {
    console.log(transformArrayToSearchJson(searchValue))

  }

  const updateReturnValue = (index: number) => (value: number[]) => {
    setSearchValue(prev => {
      const newValue = [...prev];
      newValue[index] = value;
      return newValue;
    });
  }

  return (
    <div >
      <div id="all-select">

        <AreaSelect setReturnValue={updateReturnValue(0)} />
        <Divider />
        <Price setReturnValue={updateReturnValue(1)} />
        <Divider />
        <Size setReturnValue={updateReturnValue(2)} />
        <Divider />
        <Special setReturnValue={updateReturnValue(3)} />
        <Divider />
        <Room setReturnValue={updateReturnValue(4)} />
        <Divider />
        <Direction setReturnValue={updateReturnValue(5)} />
        <Divider />
        <Height setReturnValue={updateReturnValue(6)} />
        <Divider />
        <Renovation setReturnValue={updateReturnValue(7)} />
        <Divider />
        <SubjectMatter
          setReturnValue={updateReturnValue(8)} />
        <Divider />
        <button id='confirmSelect' onClick={onClick}>
          确认
        </button>
      </div>

      <div id="house-show">
        <div id="sort">
          <Sort />
          <Divider />
        </div>
        <HouseList />
      </div>

    </div>
  )
}

export default App
