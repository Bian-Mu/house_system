import { useState } from 'react'
import './App.css'
import { Divider } from 'antd'
import AreaSelect from './component/AreaSelect/AreaSelect'
import SubjectMatter from './component/SujectMatter/SubjectMatter'
import Auction from './component/Auction/Auction'
import Property from './component/Property/Property'
import Sort from './component/Sort/Sort'
import HouseCard from './component/HouseCard/HouseCard'


function App() {

  return (
    <>
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
        <div id="house-cards">
          <HouseCard />
          <HouseCard />
          <HouseCard />
          <HouseCard />
          <HouseCard />
          <HouseCard /><HouseCard />

        </div>
      </div>
    </>
  )
}

export default App
