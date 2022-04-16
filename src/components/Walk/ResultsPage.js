import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { BarChart, Bar, LabelList, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/*
Expected API data format for both host and Participant results page.
{
    barDefaultColor: str,  // (required)    - default color of the bar graphs
    data: [ // data is a sorted array. The left most item in the array will contain data for the left most bar chart 
        {
            barName: str,  (required) - This will be displayed at the bottom of a bar. Can be an empty string.
            color: str,    (not required) - Specific color of a single bar graph.
            count: number,  (required)  - The height of the bar graph.
            participantLocation: boolean (required) - This shows the location of the participant. If sending data to host this will always be false
        },
        {
            ....
        }
    ]
}

See example below

*/
const results = {
    barDefaultColor: '#8884d8',
    data: [
        {
        barName: '',
        count: 2,
        participantLocation: false
        },
        {
        barName: '',
        count: 10,
        participantLocation: true // If sending data to participants, this will indicate location of participant.
        },
        {
        barName: '',
        count: 1,
        participantLocation: false
        },
        {
        barName: '',
        count: 6,
        participantLocation: false
        },
        {
        barName: '',
        count: 4,
        participantLocation: false
        },
        {
        barName: '',
        count: 2,
        participantLocation: false
        },
        {
        barName: '',
        count: 1,
        participantLocation: false
        },
    ]
};

const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
  
    if(value){
        return (
            <g>
              {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="red" /> */}
              <text x={x + width / 2} y={y - radius} fill={results['barDefaultColor']} textAnchor="middle" dominantBaseline="middle">
                Your Location
              </text>
            </g>
          );
    }else{
        return (<g></g>);
    }
    
  };

export default function ResultsPage(){
    return (
        <Container
            sx={{px:6, mt:3}}
        >
            <Grid 
                sx={{minHeight: '40px'}} 
                container 
                justifyContent='center' 
                alignItems='center' 
                direction='column' 
                spacing={2}
            >
                <Typography variant="h3" component="div">User Results page</Typography>
            </Grid>
            
            <Grid
                height='300px'
                sx={{minHeight: '300px', minWidth: '250px'}} 
            >
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={results["data"]}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis dataKey="barName" /> */}
                    <YAxis />
                    {/* <Tooltip /> */}
                    <Legend />
                    <Bar dataKey="count" fill={results['barDefaultColor']} minPointSize={5}>
                        <LabelList dataKey="participantLocation" content={renderCustomizedLabel} />
                    </Bar>
                    {/* <Bar dataKey="count" fill="#8884d8" /> */}
                </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Container>
    );
}