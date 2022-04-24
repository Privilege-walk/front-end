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
              <text x={x + width / 2} y={y - radius} fill={"#FC766AFF"} textAnchor="middle" dominantBaseline="middle">
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
                height='260px'
            >
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data["data"]}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip />
                    <XAxis dataKey="barName" />
                    <XAxis label="Height"   />

                    <Legend />
                    <Bar dataKey="count" name="Number of Participants" fill={"#5B84B1FF"} minPointSize={5}>
                        {data["data"].map((entry, index) => (
                            <Cell cursor="pointer" fill={ entry["participantLocation"] == true ? '#FC766AFF' : '#5B84B1FF'} key={`cell-${index}`} />
                        ))}
                        <LabelList dataKey="participantLocation" content={renderCustomizedLabel} />
                    </Bar>
                    
                </BarChart>
                    
                </ResponsiveContainer>
              </Grid>  
        </Container>
    );
}