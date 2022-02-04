import React from "react";
import { averageFunction, calculatedTolerances } from "../utilities/functions.js";
import { useLocationAndSurvey } from "../utilities/hooks.js";

const Data = () =>{
    const[location, surveyData] = useLocationAndSurvey(true)
    const surveyTypes =["OPUS_STATIC", "JPL_APPS"]
    const tolerances = ["0.5cm", "0.8cm", "2cm", "3cm", "4cm"]
    
    return(
        <div className="data_information">
            <div className="data_container">
                <h1 className="data_headers">Survey Data Analysis</h1>
                {surveyData ?  
                    <div className="data_card_container analysis">
                        <ul className="data_points">
                            <h3>Original Position</h3>
                            <ul>
                                <li>Latitude: {location.latitude}</li>
                                <li>Longitude: {location.longitude}</li>
                            </ul>
                            <h3>Positional Change</h3>
                            {surveyTypes.map((survey, key)=>(
                                <ul key={key}>
                                    <li><h4>{survey.split("_")[0]}</h4></li>
                                    <ul>
                                        <li><strong>Average X Delta:</strong> {averageFunction(surveyData, survey, "x_variance").toFixed(4)} </li>
                                        <li><strong>Average Y Delta:</strong> {averageFunction(surveyData, survey, "y_variance").toFixed(4)}</li>
                                        <li><strong>Average Z Delta:</strong> {averageFunction(surveyData, survey, "z_variance").toFixed(4)}</li>
                                        <li><strong>Average Variance:</strong> {averageFunction(surveyData, survey, "variance").toFixed(4)}</li>
                                    </ul>
                                </ul>
                            ))}
                            <h3>Tolerances</h3>
                            <ul>
                                <ul>
                                    <h5>JPL</h5>
                                    <li>{`High Confidence: ${tolerances[0]} => # of Points: ${calculatedTolerances(location, surveyData)[0]}`}</li>
                                    <li>{`Low Confidence: ${tolerances[1]} => # of Points: ${calculatedTolerances(location, surveyData)[1]}`}</li>
                                    <li>{`No Confidence: >${tolerances[1]} => # of Points: ${calculatedTolerances(location, surveyData)[2]}`}</li>
                                </ul>
                                <ul>
                                    <h5>OPUS</h5>
                                    <li>{`High Confidence: ${tolerances[2]} => # of Points: ${calculatedTolerances(location, surveyData)[3]}`}</li>
                                    <li>{`Mid Confidence: ${tolerances[3]} => # of Points: ${calculatedTolerances(location, surveyData)[4]}`}</li>
                                    <li>{`Low Confidence: ${tolerances[4]} => # of Points: ${calculatedTolerances(location, surveyData)[5]}`}</li>
                                    <li>{`No Confidence: >${tolerances[4]} => # of Points: ${calculatedTolerances(location, surveyData)[6]}`}</li>
                                </ul>
                            </ul>
                        </ul>
                    </div>
                : 'Loading'}
            </div>
        </div>
    )
}

export default Data;

