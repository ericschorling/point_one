import React from "react";
import { calcDistanceTraveled } from "../utilities/functions";

import { useLocationAndSurvey } from "../utilities/hooks";

const DataPointList = (props) =>{
    const dataType = props.type.split('_')[0]
    const [location, surveyData] = useLocationAndSurvey(true)
    const highConfidence = 0.90
    return(
        <div className="data_information">
            <div className="data_container">
                <h1 className="data_headers"><strong>{`${dataType}`} Survey Points</strong></h1>
                <div className="data_card_container">
                    {surveyData ?  surveyData.filter(data=>data.source === props.type)
                        .map(data=>(
                        <div className="data_card" key={data.survey_id}>
                            <header className="opus_header">
                                <strong>ID: {data.survey_id}</strong>
                                {dataType==="OPUS" ? 
                                    <div className={data.obs_used / data.obs_total > highConfidence ? 'high_confidence' : ''}>
                                        <strong>% Obs: </strong>  
                                        {((data.obs_used / data.obs_total)*100).toFixed(2)}%
                                    </div> 
                                : null}
                            </header>
                            <div className={"data_list"}>
                                <ul className="survey_points">
                                    <li>
                                        <strong 
                                            className="list_header">
                                            Location: 
                                        </strong>
                                        <strong>GPS: </strong> 
                                        {data.longitude}, {data.latitude}
                                    </li>
                                    <li>
                                        <strong>ECEF: </strong> 
                                        ({data.x}, {data.y}, {data.z})
                                    </li>
                                    <li>
                                        <strong>Altitude: </strong> 
                                        {data.height.toFixed(4)} m
                                    </li>
                                    <li>
                                        
                                    </li>
                                    <li>
                                        <strong 
                                            className="list_header">
                                            Positional Variance: 
                                        </strong>
                                        <div>
                                            <strong>
                                                {"Delta from Origin: "} 
                                            </strong> 
                                            {calcDistanceTraveled(location.latitude, data.latitude, location.longitude, data.longitude).toFixed(4)}mm
                                            <strong>  Alt. Change: </strong>
                                            {(location.height - data.height).toFixed(2)*100} cms  
                                            <strong> SD: </strong> 
                                            {data.variance.toFixed(5)}
                                            <strong> (X,Y, Z): </strong>
                                            ({data.x_variance}, {data.y_variance}, {data.z_variance}) 
                                            
                                        </div>  
                                        
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    )) : 'Loading'}
                </div>
            </div>
        </div>
    )
}

export default DataPointList;

