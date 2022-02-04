import React, { useEffect, useRef } from 'react'
import { calcDistanceTraveled } from '../utilities/functions';
import { useLocationAndSurvey } from '../utilities/hooks';
//global to set the color of the background of the chart
const start_background_color = "white";

/**
 * Function that creates the X Axis on the canvas
 * @param {integer} numXticks - The number of tick marks along the x axis
 * @param {integer} tickSpacing - the calculated distance between the ticks based on the data point and size of chart on y axis
 * @param {integer} xTickSpacing - the calculated distance between the ticks based on the data point and size of chart on x axis 
 * @param {Object} ctx - the context of the canvas
 * @param {integer} w - width of the canvas
 * @returns {null}
 */
const drawXAxis =(numXticks, tickSpacing, xTickSpacing, ctx, w)=>{
    for(let i=1; i<=numXticks; i++) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        
        // If line represents X-axis draw in different color
        if(i === numXticks/2) {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
        } 
        else{
            ctx.strokeStyle = "#e9e9e9";
            ctx.lineWidth = 1;
        }
        //Draw x axis with updated formating 
        if(i === numXticks) {
            ctx.moveTo(w*.1-tickSpacing, tickSpacing*i);
            ctx.lineTo(w, tickSpacing*i);
        }
        else {
            ctx.moveTo(w*.1-tickSpacing, tickSpacing*i);
            ctx.lineTo(w-((w*.1)-(xTickSpacing*numXticks)), tickSpacing*i+0.5);
        }
        ctx.stroke();
    }
}

/**
 * Function to draw the x ticks on the graph
 * @param {integer} numYticks - number of y data points being displayed
 * @param {integer} numXTicks - number of x data points being displayed
 * @param {integer} tickSpacing - spacing of y axis tick marks
 * @param {integer} xTickSpacing - spacing of x axis tick marks
 * @param {Object} ctx - context object for the canvas
 * @param {integer} yOffset - distance from the lift bound of the canvas to start the chart
 * @returns {null}
 */
const drawXticks =(numYticks, numXTicks, tickSpacing, xTickSpacing, ctx,  yOffset) =>{
    //Creating a data array from the data based on the string provided and only returning the data for the selected range
    
    //additional iterative value
    let position = 0;
    //loop to plot all the date on the x axis
    for(let i = 0; i<numYticks; i++){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        
        ctx.moveTo(tickSpacing*position+yOffset, xTickSpacing * numXTicks);
        ctx.lineTo(tickSpacing*position+yOffset, xTickSpacing * numXTicks+xTickSpacing);
        ctx.stroke();

        //setting the data label
        ctx.font= '10px Arial';
        ctx.translate(tickSpacing*position+yOffset, xTickSpacing * numXTicks+ xTickSpacing);
        ctx.rotate(-Math.PI / 4);
        ctx.textAlign='right';
        ctx.fillStyle = '#000000';

        //writing date data to chart
        //fill text could be an optional item
        ctx.fillText(`${((numYticks/2 - i)*xTickSpacing)/10}(1/1T)`, 0,0);
        
        //using transform required resetting the base of the context to 0
        ctx.setTransform(1,0,0,1,0,0);
        position += 1;
    }
}

/**
 * function to draw the y axis on the chart
 * @param {integer} numYticks - number of y axis values to plot
 * @param {integer} tickSpacing - spacing between the data points on the chart calculated from range values
 * @param {Object} ctx - current context of canvas
 * @param {integer} h - height of canvas
 * @param {integer} w - width of canvas
 * @param {integer} yOffset - distance from left bound of canvas to start drawing
 * @param {integer} xTickSpacing - distance between the x values on the graph
 * @returns {null}
 */
const drawYAxis =(numYticks, tickSpacing, ctx, h,w, yOffset, xTickSpacing)=>{
    //semi responsive solution to the graph label that calculates font size off of width of canvas
    const fontHeight = (h*.02);
    //Drawing graph label
    ctx.font= `${fontHeight}px Arial`;
    ctx.textAlign='right';
    ctx.fillStyle = '#000000';
    ctx.fillText(`Longitude`, w*.55,h*.95);

    //loop to draw all lines for y axis
    for(let i=0; i<=numYticks; i++) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        
        // If line represents X-axis draw in different color
        if(i === numYticks/2) {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 5;
        } 
        else{
            ctx.strokeStyle = "#e9e9e9";
            ctx.lineWidth = 1;
        }
        
        if(i === yOffset) {
            ctx.moveTo(tickSpacing*i,0+xTickSpacing);
            ctx.lineTo( tickSpacing*i, (h*.8));
        }
        else {
            ctx.moveTo(tickSpacing*i+yOffset,0+xTickSpacing );
            ctx.lineTo(tickSpacing*i+yOffset, (h*.8));
        }
        ctx.stroke();
    }
}
/**
 * Function to draw the y tick data
 * @param {integer} numYticks - number of y axis data points to plot
 * @param {integer} tickSpacing - y axis spacing between the ticks on the graph
 * @param {Object} ctx - context object for current canvas
 * @param {integer} w - width of canvas
 * @param {integer} xTickSpacing - x axis tick spacing value
 * @returns {null}
 */

const drawYTicks =(numYticks, tickSpacing, ctx, w, xTickSpacing) =>{

    const fontHeight = w*.02;
    //Chart label
    ctx.font= `${fontHeight}px Arial`;
    ctx.textAlign='right';
    ctx.fillStyle = '#000000';
    ctx.rotate(-Math.PI / 2);
    ctx.translate(-w*0.3, 10)
    ctx.fillText(`Latitude`, 0,0)
    ctx.rotate(Math.PI / 2)
    ctx.setTransform(1,0,0,1,0,0);
    //Lopp to draw data points and ticks
    for(let i = 1; i<numYticks; i++){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        //ctx.translate( yOffset*tickSpacing, h*0.5);
        ctx.moveTo(numYticks+w*.1-xTickSpacing, tickSpacing*i);
        ctx.lineTo(numYticks+w*.1 - tickSpacing, tickSpacing*i);
        ctx.stroke();

        ctx.font= '10px Arial';
        ctx.textAlign='right';
        ctx.fillStyle = "#000000";
        ctx.fillText(`${((numYticks/2 - i)*xTickSpacing)/10}(1/1T)`, numYticks+w*.1 - xTickSpacing, tickSpacing*i);
        
        ctx.setTransform(1,0,0,1,0,0);
    }
}

/**
 * Function to draw the  data onto the  chart
 * @param {string} data - data from the survey data
 * @param {integer} numDates - number of data points to plot
 * @param {Object} ctx - current canvas context
 * @param {integer} h - height of canvas
 * @returns {null}
 */

const drawData = (data,ctx, h,w)=>{
    
    //Move the context start to the bottom left of the graph 
    ctx.translate(w*.54,h*.4);
    //loop to plot data points
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle ="green"
    ctx.arc(0, 0, 50, 0 , 2 * Math.PI);
    ctx.stroke()
    for (let i = data.length-1; i>=0; i--){
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle ="#000000"

        // ctx.moveTo(data.xCoord, data.yCoord)
        let color
        if(data[i].type === "JPL_APPS"){
            if(data[i].distanceFromOrigin <= 5){
                color = 'green'
            }else {
                if(data[i].distanceFromOrigin > 5 && data[i].distanceFromOrigin <= 8){
                    color = 'blue'
                }else {
                    color = "red"
                }
            }
        } else {
            if(data[i].type === "OPUS_STATIC"){
                if( data[i].distanceFromOrigin <= 20){
                    color = "pink"
                } else {
                    color = "black"
                }
            }
        }
        ctx.fillStyle = color
        ctx.arc(data[i].longitude, data[i].latitude, 5, 0 , 2 * Math.PI);
        ctx.fill()
        ctx.stroke()

    }
}

/**
 * Chart component rendered for the application
 * @returns {Component}
 */
const Location =()=>{
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const canvasContainer = useRef(null);
    const[location, surveyData] = useLocationAndSurvey(true)
    //Canvas rendered immediately upon load 
    //This will rerender every time the isReset value changes 
    useEffect(()=>{
        if(surveyData) {
            const surveyPoints = surveyData.filter(data=> data.status ==="COMPLETE").map(data=>(
            
                {
                    "type": data.source,
                    "latitude": (location.latitude - data.latitude)*1000000000,
                    "longitude": (location.longitude - data.longitude)*1000000000,
                    "percentAcc": data.obs_total ? (data.obs_used / data.obs_total)*100 : 0,
                    "distanceFromOrigin": calcDistanceTraveled(location.latitude, data.latitude, location.longitude, data.longitude)
                }
            ))
            const canvas = canvasRef.current;
            canvas.width = canvasContainer.current.offsetWidth*.9;
            canvas.height = 600;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${canvas.height}px`;

            const context = canvas.getContext("2d");

            context.fillStyle = start_background_color;
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            const numYticks = 20;
            let tickSpacing = 20; //Sets the y axis tick spacing
            const numXticks = Math.floor(canvas.height* .8 /tickSpacing);
            
            const yTickSpacing = Math.floor(canvas.width*.9/numYticks);
            //const numYticks = Math.floor(canvas.width * .9 / tickSpacing)
            const yOffset = canvas.width*.1;
            
            //draw and graph the chart
            drawXAxis(numXticks, tickSpacing,yTickSpacing, context, canvas.width);
            drawYAxis(numYticks, yTickSpacing, context, canvas.height, canvas.width, yOffset,tickSpacing);
            drawXticks( numYticks, numXticks, yTickSpacing, tickSpacing, context, yOffset);
            drawYTicks(numXticks,tickSpacing,context,canvas.width, yTickSpacing);
            drawData(surveyPoints, context,canvas.height, canvas.width, location);

            contextRef.current = context;
        }
    },[surveyData, location])
    
    return (
            <>
            {surveyData ? 
                <div ref={canvasContainer} className="graph_container" >
                    <h1 className="header scatter_header">
                        Delta from Origin
                    </h1>
                    <div className="canvas-container">
                        <canvas
                            ref={canvasRef}
                            className="canvas-screen"
                        />  
                    </div>
                    <div>
                        <ul className="plot_key">
                            <li className="dot green"></li>
                            <li>{"JPL \u0394 < 0.5cm"}</li>
                            <li className="dot blue"></li>
                            <li>{"JPL \u0394 > 0.5cm and < 0.8cm"}</li>
                            <li className="dot red"></li>
                            <li>{"JPL \u0394 > 0.8cm"}</li>
                            <li className="dot pink"></li>
                            <li>{"OPUS \u0394 < 2cm"}</li>
                            <li className="dot black"></li>
                            <li>{"OPUS \u0394 > 2cm"}</li>
                        </ul>
                    </div>
                </div>  
            : <h1>Loading</h1>}
            </>


    )
}

export default Location