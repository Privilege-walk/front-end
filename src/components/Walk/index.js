import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


export default function Walk(){
    
    return (
        <Container 
            min 
            sx={{px:6, mt:3}}
        >
            <Grid sx={{border: '2px solid', minHeight: '40px'}} container justifyContent='center' alignItems='center' direction='column' spacing={2}>
                {/* Header */}
                <Grid lg={1} sx={{border: '2px solid'}} item direction='column'>
                    <Grid sx={{border: '2px solid'}} item>
                        <Typography  variant="h5" component="div">
                            Perspective Walk
                        </Typography>
                    </Grid>

                    <Grid sx={{border: '2px solid'}} item>
                        <Typography  variant="h5" component="div">
                            Graph
                        </Typography>
                    </Grid>
                </Grid>

                {/* Body */}
                <Grid lg={10} sx={{border: '2px solid', minHeight: '225px'}} item direction='column'>
                    <Grid sx={{border: '2px solid'}} item>
                        <Typography  variant="h5" component="div">
                            Question
                        </Typography>
                    </Grid>

                    <Grid sx={{border: '2px solid'}} item>
                        <Typography  variant="h5" component="div">
                            Answers
                        </Typography>
                    </Grid>
                </Grid>

                {/* Footer */}
                <Grid lg={1} sx={{border: '2px solid', minHeight: '50px'}} item direction='column'>
                    <Grid sx={{border: '2px solid'}} item>
                        <Typography  variant="h5" component="div">
                            25/50 people answered so far. 
                        </Typography>
                    </Grid>

                    <Grid sx={{border: '2px solid'}} item>
                        <Typography  variant="h5" component="div">
                            3/10 Questions answered so far.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}