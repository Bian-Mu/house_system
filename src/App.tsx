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

interface HouseCardShow {
  cover: string
  address: string
  price: number
  size: number
  id: number
}

// const list = [
//   {
//     "cover": "/src/assets/image.png",
//     "address": "吉林省 安安市 沾化县 弘街826号 22号门牌",
//     "price": 79.19,
//     "size": 69,
//     "id": 64534567876
//   },
//   {
//     "cover": "/src/assets/image.png",
//     "address": "湖南省 宁宁市 界首市 盈桥40号 41号院",
//     "price": 507.79,
//     "size": 23,
//     "id": 8223456346
//   },
//   {
//     "cover": "/src/assets/image.png",
//     "address": "西藏自治区 南阳市 沾益县 晋栋3号 59号楼",
//     "price": 801.21,
//     "size": 71,
//     "id": 2198765445
//   }
// ]



function App() {
  const [searchValue, setSearchValue] = useState<number[][]>([[], [], [], [], [], [], [], [], []]);
  const [list, setList] = useState<HouseCardShow[]>([])


  const onClick = async () => {
    const requestData = transformArrayToSearchJson(searchValue)
    try {
      const response = await fetch('https://m1.apifoxmock.com/m2/6122515-5814159-default/279131372', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success) {
        setList(data.results);
      }

    } catch (err) {
      console.error('请求出错:', err);
    }
  };


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
        <HouseList list={list} />
      </div>

    </div>
  )
}

export default App
