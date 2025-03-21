import './App.css'
import { Divider } from 'antd'
import AreaSelect from './component/AreaSelect/AreaSelect'
import SubjectMatter from './component/SujectMatter/SubjectMatter'
import Auction from './component/Auction/Auction'
import Property from './component/Property/Property'
import Sort from './component/Sort/Sort'
import HouseList from './component/HouseList/HouseList'
import UploadBox from './component/UploadBox/UploadBox'
import HousePage from './component/HousePage/HousePage'


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


      <div>
        <HousePage HouseID={"cjdoajffjffffje"} />
      </div>
    </div>
  )
}

export default App
