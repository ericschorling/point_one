export const getProgrammedLocation = async () =>{
    const data = await fetch('http://localhost:5000/location')
    const json = await data.json()

    return json
}
export const getSurveyData = async () =>{
    const data = await fetch('http://localhost:5000/survey')
    const json = await data.json()
    return json
} 

