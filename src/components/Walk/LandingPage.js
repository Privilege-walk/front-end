import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { event } from "../../api/mockData/event";

export default function LandingPage({eventName}){
    
    return (
        <Container sx={{px : 6, mt: 5}}>
            <Grid container justifyContent='center' alignItems='center' direction='column' spacing={2}>
                <Grid item>
                    <Typography variant="h5" component="div">
                        {eventName}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="p" component="div">
                        Waiting for the host to start the event. Your answers are
                        anonymized and will not be stored by the host. 
                    </Typography>
                </Grid>

                <Grid item sx={{ mt: 2 }}>
                    <Button onClick={()=>{}} variant="outlined">Waiting for host ...</Button>
                </Grid>
            </Grid>
        </Container>
    )
}