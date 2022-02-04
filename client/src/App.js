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
      </header>
      <div>
        <div className='container data_visualization'>
          <Data />
          <DataPointList type={"JPL_APPS"} />
          <DataPointList type={"OPUS_STATIC"}/>
        </div>
        <div className="container">
          <Location/>
          <Map />
        </div>
        <div className="container"> 
          <Height />
        </div>
      </div>
      
      
    </div>
  )
}

export default App;
