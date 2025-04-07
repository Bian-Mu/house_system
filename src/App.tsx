import './App.css'
import { Button, Divider } from 'antd'
import AreaSelect from './component/House/Select/AreaSelect/AreaSelect'
import SubjectMatter from './component/House/Select/SujectMatter/SubjectMatter'
import Sort from './component/House/Sort/Sort'
import HouseList from './component/House/HouseList/HouseList'
import { useEffect, useState } from 'react'
import Price from './component/House/Select/Price/Price'
import Size from './component/House/Select/Size/Size'
import Special from './component/House/Select/Special/Special'
import Room from './component/House/Select/Room/Room'
import Direction from './component/House/Select/Direction/Direction'
import Height from './component/House/Select/Height/Height'
import Renovation from './component/House/Select/Renovation/Renovation'

import transformArrayToSearchJson from './utils/search'
import AddressSearch from './component/House/AddressSearch/AddressSearch'
import signal from "./assets/signal.jpg"
import UserInfo from './component/House/UserInfo/UserInfo'
import { API_BASE_URL } from './constants'



interface HouseCardShow {
  cover: string
  address: string
  price: number
  size: number
  houseID: number
  uploadTime: string
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
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState(["default", "default"])

  const handleWayChange = (value: string) => {
    setSort([value, sort[1]]);
  };

  const handleUpDownChange = (value: string) => {
    setSort([sort[0], value]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('未找到认证token');

        const response = await fetch(`${API_BASE_URL}/house/list`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: "GET"
        });

        const data = await response.json();
        // if (data.success) {
        setList(data.results);
        // }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onClick = async () => {
    const requestData = transformArrayToSearchJson(searchValue)
    console.log(requestData)
    setLoading(true)
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('未找到认证token');

      // console.log(token)
      const response = await fetch(`${API_BASE_URL}/house/select`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`  // 添加Authorization头
        },
        body: JSON.stringify(requestData),
      });

      // console.log(response)
      const data = await response.json();
      setList(data.results);

    } catch (err) {
      console.error('请求出错:', err);
    } finally {
      setLoading(false);
    }
  };


  const updateReturnValue = (index: number) => (value: number[]) => {
    setSearchValue(prev => {
      const newValue = [...prev];
      newValue[index] = value;
      return newValue;
    });
  }

  const onEnter = async (value: string) => {
    // console.log(value)
    setLoading(true)
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('未找到认证token');

      const response = await fetch(`${API_BASE_URL}/house/search?address=${value}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();

      // if (data.success) {
      setList(data.results);
      // }
    } catch (err) {
      console.error("请求出错：", err)
    } finally {
      setLoading(false);
    }
  }


  return (
    <div >

      <div id="address-search">
        <AddressSearch onEnter={onEnter} />

        <Button onClick={() => { window.open(`/customer`, '_blank') }} id='jumpToCustomer'>
          查看客户
        </Button>
        <UserInfo />
        <img src={signal} />
      </div>
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
          <Sort onWayChange={handleWayChange}
            onUpDownChange={handleUpDownChange} />
          <Divider />
        </div>
        {loading ? <div>Loading...</div> : <HouseList list={list} sort={sort} />}
      </div>
    </div>
  )
}

export default App
