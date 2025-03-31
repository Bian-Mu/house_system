import './App.css'
import { Divider } from 'antd'
import AreaSelect from './component/AreaSelect/AreaSelect'
import SubjectMatter from './component/SujectMatter/SubjectMatter'
import Auction from './component/Auction/Auction'
import Property from './component/Property/Property'
import Sort from './component/Sort/Sort'
import HouseList from './component/HouseList/HouseList'
import { useState } from 'react'
import { Button } from 'antd/es/radio'


function App() {
  const [searchValue, setSearchValue] = useState<number[][]>([[], [], [], []]);

  const onClick = () => {
    console.log(searchValue)
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
        <SubjectMatter
          setReturnValue={updateReturnValue(0)} />
        <Divider />
        <AreaSelect setReturnValue={updateReturnValue(1)} />
        <Divider />
        <Property setReturnValue={updateReturnValue(2)} />
        <Divider />
        <Auction setReturnValue={updateReturnValue(3)} />
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
