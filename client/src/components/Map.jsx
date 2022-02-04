import React, {useRef, useEffect} from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useLocationAndSurvey } from '../utilities/hooks';

//Mapbox access token for api use
mapboxgl.accessToken ='pk.eyJ1IjoiZXNjaG9ybGluZyIsImEiOiJja3l1Z2N6dmswYzR5MnVxazA3MGwwa2owIn0.GjT6MseObzq1HfP6NrG1NQ'

/**
 * Map component rendered for the application
 * @returns {Component}
 */

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [location, surveyData] = useLocationAndSurvey(true)  

useEffect(() => {
  if(surveyData){
    const surveyPoints = surveyData.filter(data=> data.status ==="COMPLETE").map(data=>(
      {"type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              data.longitude, 
              data.latitude
              ]
            }
          })
      )
    if(map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-81.10636009645887,28.948745596622594],
      zoom: 12,
      positionOptions:{
        enableHighAccuracy: true
      }
    });
    
    map.current.on('load',  ()=>{
      map.current.addLayer({
        id:'locations',
        type:'circle',
        source:{
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": surveyPoints
          }
        },
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 5,
          'circle-stroke-width': 0,
          'circle-stroke-color': '#ffffff'
        }
      })
      map.current.addLayer({
        id:'original',
        type:'circle',
        source:{
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    location.longitude,
                    location.latitude
                  ]
                }
              }
            ]
          }
        },
        paint: {
          'circle-color': '#000000',
          'circle-radius': 2,
          'circle-stroke-width': 0,
          'circle-stroke-color': '#ffffff'
          }
      })
    })
  };
  
},[surveyData, location]);


  return (
      
      <div className='map_container'>
        <h1>
          Mapped Physical Location
        </h1>
        <div ref={mapContainer} className='map' />
        <p>*All Complete Survey Points Mapped</p>
        <div>
            <ul className="plot_key">
                <li className="dot black"></li>
                <li>Origin</li>
                <li className="dot blue"></li>
                <li>Survey Points</li>
            </ul>
        </div>
      </div>
  )
}

export default Map;
