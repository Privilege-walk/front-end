import React from "react";
import QRCode from 'react-qr-code';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function UserQRCode({url}) {
    return (
        <Paper sx={{p : 2}}>
            <Grid container justifyContent='center' alignItems='center' direction='column' spacing={2}>
                <Grid item>
                    <Typography variant="h6" component="div">
                        Scan QR code to join
                    </Typography>
                </Grid>

                <Grid item>
                    <QRCode value={url} 
                        // size={'100%'} 
                    />
                </Grid>
                
                <Grid item>
                    <Typography variant="h6" component="div">
                        Link to join: {url}
                    </Typography>
                </Grid>

                <Grid item>
                    <Button variant="outlined">Start</Button>
                </Grid>
            </Grid>
        </Paper>   
    )
}