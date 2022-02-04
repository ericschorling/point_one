import React from 'react'
import Map from './components/Map.jsx'
import Location from './components/Location.jsx'
import Height from './components/Height.jsx'
import Data from './components/Data.jsx'
import DataPointList from './components/DataPointList.jsx'


function App() {
    return (
    <div className='display' >
      <header className="app_header">
        <h1>Survey Data Point Analysis</h1>
        <nav>
          <ul className='nav_header'>
            <li><a href="#data">Data</a></li>
            <li><a href="#map">Position</a></li>
            <li><a href="#height">Altitude</a></li>
          </ul>
        </nav>
      </header>
      <div>
        <h2 className="section_header" id="data">Survey Data</h2>
        <div className='container data_visualization'>
          <Data />
          <DataPointList type={"JPL_APPS"} />
          <DataPointList type={"OPUS_STATIC"}/>
        </div>
        <h2 className="section_header" id="map">GPS Position</h2>
        <div className="container" >
          <Location/>
          <Map />
        </div>
        <h2 className="section_header" id="height">Altitude</h2>
        <div className="container" > 
          <Height />
        </div>
      </div>
      
      
    </div>
  )
}

export default App;
