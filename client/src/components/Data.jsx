import React from "react";
import { averageFunction, calculatedTolerances } from "../utilities/functions.js";
import { useLocationAndSurvey } from "../utilities/hooks.js";

/**
 * Data interpretation component rendered for the application
 * @returns {Component}
 */
const Data = () =>{
    const[location, surveyData] = useLocationAndSurvey(true)
    const surveyTypes =["OPUS_STATIC", "JPL_APPS"]
    const tolerances = ["0.5cm", "0.8cm", "2cm", "3cm", "4cm"]

    /**
     * Determination of likelyhood of movement
     * @returns {string} - movement likelyhood in Low, Medium, High
     */
    const movementPotential =()=>{
        let movementDetermination = ''
        const surveyTolerances = calculatedTolerances(location, surveyData)

        const totalPoints = surveyTolerances.reduce((current, previous)=> current + previous)

        const percentHighConfidence = (surveyTolerances[0]+ surveyTolerances[3])/ totalPoints * 100

        const percentLowMidConfidence = (surveyTolerances[1]+surveyTolerances[4]+surveyTolerances[5])/totalPoints * 100

        const percentNoConfidence = (surveyTolerances[2]+ surveyTolerances[6])/totalPoints * 100

        if(percentHighConfidence > 50 || percentHighConfidence< 25){
            movementDetermination = 'Low'
        } else {
            if(percentLowMidConfidence > 70){
                movementDetermination = 'Medium'
            } else {
                if (percentNoConfidence > 25){
                    movementDetermination = 'High'
                }
            }
        }

        return movementDetermination
    }
    return(
        <div className="data_information">
            <div className="data_container">
                <h1 className="data_headers"><strong>Survey Data Analysis</strong></h1>
                {surveyData ?  
                    <div className="data_card_container analysis">
                        <ul className="data_points">
                            <h3>Original Position</h3>
                            <ul>
                                <li><strong>Latitude:</strong> {location.latitude}</li>
                                <li><strong>Longitude:</strong> {location.longitude}</li>
                                <li><strong>ECEF: </strong>({location.x} , {location.y}, {location.z})</li>
                            </ul>
                            <h2>Positional Change</h2>
                            <h3>Likelyhood of Movement</h3>
                            <h4 className={movementPotential()==="Low" ? "low" : movementPotential() ==="Medium" ? 'medium' : 'high'}><strong>{movementPotential()}</strong></h4>
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
                                    <li><strong>High Confidence:</strong> {` ${tolerances[0]} => # of Points: ${calculatedTolerances(location, surveyData)[0]}`}</li>
                                    <li><strong>Low Confidence:</strong>{` ${tolerances[1]} => # of Points: ${calculatedTolerances(location, surveyData)[1]}`}</li>
                                    <li><strong>No Confidence:</strong>{` ${tolerances[1]} => # of Points: ${calculatedTolerances(location, surveyData)[2]}`}</li>
                                </ul>
                                <ul>
                                    <h5>OPUS</h5>
                                    <li><strong>High Confidence:</strong>{` ${tolerances[2]} => # of Points: ${calculatedTolerances(location, surveyData)[3]}`}</li>
                                    <li><strong>Mid Confidence:</strong>{` ${tolerances[3]} => # of Points: ${calculatedTolerances(location, surveyData)[4]}`}</li>
                                    <li><strong>Low Confidence:</strong>{` ${tolerances[4]} => # of Points: ${calculatedTolerances(location, surveyData)[5]}`}</li>
                                    <li><strong>No Confidence:</strong>{` ${tolerances[4]} => # of Points: ${calculatedTolerances(location, surveyData)[6]}`}</li>
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

