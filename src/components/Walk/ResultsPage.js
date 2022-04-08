import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

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
        </Container>
    );
}