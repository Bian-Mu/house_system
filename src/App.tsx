import { Fragment, useState } from 'react'
import './App.css'
import { Divider, Pagination } from 'antd'
import AreaSelect from './component/AreaSelect/AreaSelect'
import SubjectMatter from './component/SujectMatter/SubjectMatter'
import Auction from './component/Auction/Auction'
import Property from './component/Property/Property'
import Sort from './component/Sort/Sort'
import HouseList from './component/HouseList/HouseList'


function App() {

  return (
    <div >
      <div id="all-select">
        <SubjectMatter />
        <Divider />
        <AreaSelect />
        <Divider />
        <Property />
        <Divider />
        <Auction />
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
