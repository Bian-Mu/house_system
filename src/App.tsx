import './App.css'
import { Divider } from 'antd'
import AreaSelect from './component/House/AreaSelect/AreaSelect'
import SubjectMatter from './component/House/SujectMatter/SubjectMatter'
import Auction from './component/House/Auction/Auction'
import Property from './component/House/Property/Property'
import Sort from './component/House/Sort/Sort'
import HouseList from './component/House/HouseList/HouseList'
import { useState } from 'react'


function App() {
  //更新后将筛选值发给后端，后端应该返回符合条件的房子的（第一张图片、地址、价格、id）
  const [searchValue, setSearchValue] = useState<number[][]>([[], [], []]);

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
        {/* <Auction setReturnValue={updateReturnValue(3)} />
        <Divider /> */}
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
