
import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { 
    BarChart, Bar, Legend,
    XAxis, YAxis, CartesianGrid,  
    ResponsiveContainer 
} from 'recharts';


export default function QuestionGraph({ data }){
    if (!data){
        return (<Container></Container>);
    }else{
        return (
            <Container
                sx={{px:6, mt:3}}
            >
                <Grid
                    height='200px'
                >
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={300}
                        height={300}
                        data={data["answers"]}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <XAxis dataKey="answer" />
                        <Legend />
                        <Bar dataKey="count" fill={"#5B84B1FF"} minPointSize={5}>
                        </Bar>
                    </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Container>
        );
    }
}
