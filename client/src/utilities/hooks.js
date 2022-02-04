import {useState, useEffect} from 'react'

/**
 * Function to fetch original location from API
 * @returns {Object} - object of the original location information
 */

const getProgrammedLocation = async () =>{
    const data = await fetch('http://localhost:5000/location')
    const json = await data.json()
    return json
}

/**
 * Function to fetch survey points  from API
 * @returns {Object[]} - Array of objects of the survey location information
 */
const getSurveyData = async () =>{
    const data = await fetch('http://localhost:5000/survey')
    const json = await data.json()
    return json
} 

/**
 * Custom hook to return the location and surveyData fetched from the API
 * @param {boolean} - Boolean value to determine if incomplete data should be excluded
 * @returns {Object[]} - Array containing the location object and survey data object
 */
export function useLocationAndSurvey(filter) {
    const [surveyData, setSurveyData] = useState(null)
    const [location, setLocation] = useState(null)
    useEffect(()=>{
        (async () =>{
            const {location} = await getProgrammedLocation()
            const {survey} = await getSurveyData()
            const surveyData = filter ? 
                survey.filter(data=> data.status ==="COMPLETE") 
                : survey
            setLocation(location)
            setSurveyData(surveyData)
        })()
    },[filter])
    

    return [location, surveyData]
}
