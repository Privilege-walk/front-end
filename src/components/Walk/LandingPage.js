import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { event } from "../../api/mockData/event";

export default function LandingPage({goNextPage}){
    
    return (
        <Container sx={{px : 6, mt: 5}}>
            <Grid container justifyContent='center' alignItems='center' direction='column' spacing={2}>
                <Grid item>
                    <Typography variant="h5" component="div">
                        {event.name}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="p" component="div">
                        {event.description}
                    </Typography>
                </Grid>

                <Grid item sx={{ mt: 2 }}>
                    <Button onClick={goNextPage} variant="outlined">Start</Button>
                </Grid>
            </Grid>
        </Container>
    )
}