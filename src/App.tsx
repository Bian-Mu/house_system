import { useState } from 'react'
import './App.css'

import AreaSelect from './component/AreaSelect/AreaSelect'
import SubjectMatter from './component/SujectMatter/SubjectMatter'
import { Divider } from 'antd'


function App() {

  return (
    <>
      <div id="all-select">
        <SubjectMatter />
        <Divider />
        <AreaSelect />
        <Divider />
      </div>
      <div id="house-show">
        此处应为数个房源单元
      </div>
    </>
  )
}

export default App
