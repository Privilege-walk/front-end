import React from "react";
import QRCode from 'react-qr-code';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { getFrontendBaseUrl } from "../../api/functions";

export default function UserQRCode({eventId, eventName, goNextPage}) {
    const url = getFrontendBaseUrl() + "/walk/" + eventId; 

    return (
        <Paper sx={{p : 2}}>
            <Grid container justifyContent='center' alignItems='center' direction='column' spacing={2}>
                <Grid item>
                    <Typography sx={{mb:3}} variant="h5" component="div">
                        Event: {eventName}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Scan to join event 
                    </Typography>
                </Grid>

                <Grid item>
                    <QRCode value={url} 
                        // size={'100%'} 
                    />
                </Grid>
                
                <Grid item>
                    <Typography variant="h6" component="div">
                        Link to join: <a href={url} id="urlToJoin">{url}</a>
                    </Typography>
                </Grid>

                <Grid item>
                    <Button 
                        id="start-event"
                        variant="outlined"
                        onClick={() => goNextPage()}
                    >
                        Start
                    </Button>
                </Grid>
            </Grid>
        </Paper>   
    )
}