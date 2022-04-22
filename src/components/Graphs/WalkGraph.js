import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { BarChart, Bar, LabelList, Cell, XAxis, 
    YAxis, CartesianGrid, Tooltip, Legend, 
    ResponsiveContainer, Label
} from 'recharts';

const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;
  
    if(value){
        return (
            <g>
              {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill="red" /> */}
              <text x={x + width / 2} y={y - radius} fill={"#82ca9d"} textAnchor="middle" dominantBaseline="middle">
                Your Location
              </text>
            </g>
          );
    }else{
        return (<g></g>);
    }
    
  };
  
// Perspective Walk graph used to show the position of different participants.
export default function WalkGraph({ data }){

    if (data.length == 0){
        return (<Container></Container>);
    }
    return (
        <Container
            sx={{px:6, mt:3}}
        >
            <Grid
                height='250px'
            >
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data["data"]}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Participants" fill={"#8884d8"} minPointSize={5}>
                        {data["data"].map((entry, index) => (
                            <Cell cursor="pointer" fill={ entry["participantLocation"] == true ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
                        ))}
                        <LabelList dataKey="participantLocation" content={renderCustomizedLabel} />
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Container>
    );
}