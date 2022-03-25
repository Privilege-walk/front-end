import React, { useState } from "react";
import React, { useState } from "react";
import { 
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

export default function EventListItem({ props }) {
    
    return (
        <Card>
            <CardText>Thanks giving Event.</CardText>
            <Button>Edit</Button>
        </Card>
    );
}