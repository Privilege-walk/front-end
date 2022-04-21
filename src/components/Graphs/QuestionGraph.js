
import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { 
    BarChart, Bar, LabelList, Cell, XAxis, 
    YAxis, CartesianGrid, Tooltip, Legend, 
    ResponsiveContainer 
} from 'recharts';




export default function QuestionGraph(props){
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
                    width={300}
                    height={300}
                    data={props.data["answers"]}
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
                    <Bar dataKey="count" fill={"blue"} minPointSize={5}>
                        {/* <LabelList dataKey="participantLocation" content={renderCustomizedLabel} /> */}
                    </Bar>
                    {/* <Bar dataKey="count" fill="#8884d8" /> */}
                </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Container>
    );
}
