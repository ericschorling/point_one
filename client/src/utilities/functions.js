/**
 * Function to calculate distance in millimeters
 * @param {integer} latitude1 - latitude of origin
 * @param {integer} latitude2 - latitude of data point
 * @param {integer} longitude1 - longitude of origin
 * @param {integer} longitude2 - longitude of data point
 * @returns {integer} - distance in mm
 */

export const calcDistanceTraveled=(latitude1, latitude2, longitude1, longitude2)=>{
    //Source: https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/ Calculation for distance between two points of longitutde and latitude
    // distance between latitudes
    // and longitudes
    let dLat = (latitude2 - latitude1) * Math.PI / 180.0;
    let dLon = (longitude2 - longitude1) * Math.PI / 180.0;
       
    // convert to radiansa
    const lat1 = (latitude1) * Math.PI / 180.0;
    const lat2 = (latitude2) * Math.PI / 180.0;
     
    // apply formulae
    let a = Math.pow(Math.sin(dLat / 2), 2) +
               Math.pow(Math.sin(dLon / 2), 2) *
               Math.cos(lat1) *
               Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c * 1000000;
}

/**
 * Function to calculate average of a list of data points
 * @param {Object[]} data - Object that contains information about the data that is going to be averaged
 * @param {string} data[].source - name of survey source
 * @param {string} data[].[dataType] - data types for the object
 * @param {string} dataType - survey source to calculate
 * @param {string} dataPoint - data point within survey data to use for calculation
 * @returns {integer} - average for the data requested
 */
export const averageFunction = (data, dataType, dataPoint)=>{
    const filteredData = data.filter(data => data.source === dataType)
    const dataPoints = filteredData.map(data => data[dataPoint])
    const average = dataPoints.reduce((current, previous)=>current + previous) / dataPoints.length
    return average
}

/**
 * Function to calculate average of a list of data points
 * @param {Object} location - the original location of the tower
 * @param {integer} location.latitude - latitude of original location
 * @param {integer} location.longitude - longitude of original location
 * @param {Object[]} surveyData - all the survey data points collected 
 * @param {integer} surveyData.latitude - latitude of survey point
 * @param {integer} surveyData.longitude - longitude of survey point
 * @returns {integer[]} - array of number of instances of each tolerance level
 */

export const calculatedTolerances = (location, surveyData) => {
    let jplHigh = 0
    let jplLow = 0
    let jplNo = 0
    let opusHigh = 0
    let opusMid = 0
    let opusLow = 0
    let opusNo = 0

    for(let i = 0; i< surveyData.length; i++){
        let distance = calcDistanceTraveled(location.latitude, surveyData[i].latitude, location.longitude, surveyData[i].longitude)
        if(surveyData[i].source === "JPL_APPS"){
            if(distance <= 5){
                jplHigh += 1
            }else {
                if(distance > 5 && distance <= 8){
                    jplLow += 1
                }else {
                    jplNo += 1
                }
            }
        } else {
            if(surveyData[i].source === "OPUS_STATIC"){
                if( distance <= 20){
                    opusHigh += 1
                } else {
                    if(surveyData[i].obs_used / surveyData[i].obs_total > 0.9 && distance <= 40){
                        opusMid += 1
                    } else {
                        if(surveyData[i].obs_used / surveyData[i].obs_total > 0.7 && distance <= 30){
                            opusLow += 1
                        } else {
                            opusNo += 1
                        }
                    }
                }
            }
        }
    }
    return [jplHigh, jplLow, jplNo, opusHigh, opusMid, opusLow, opusNo]
}