import {useState, useEffect} from 'react'

const getProgrammedLocation = async () =>{
    const data = await fetch('http://localhost:5000/location')
    const json = await data.json()

    return json
}
const getSurveyData = async () =>{
    const data = await fetch('http://localhost:5000/survey')
    const json = await data.json()
    return json
} 
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
