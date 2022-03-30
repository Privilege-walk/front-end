import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function Welcome(){
    
    return (
        <Container sx={{px : 6, mt: 5}}>
            <Grid container justifyContent='center' alignItems='center' direction='column' spacing={2}>
                <Grid item>
                    <Typography variant="h5" component="div">
                        Perspective Walk
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="p" component="div">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type 
                    specimen book. It has survived not only five centuries, but also the leap into 
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 
                    1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
                    recently with desktop publishing software like Aldus PageMaker including versions of 
                    Lorem Ipsum
                    </Typography>
                </Grid>

                <Grid item sx={{ mt: 2 }}>
                    <Button variant="outlined">Start</Button>
                </Grid>
            </Grid>
        </Container>
    )
}