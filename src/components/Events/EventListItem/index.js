import React, { useState } from "react";
import { 
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Badge
 } from 'reactstrap';

export default function EventListItem({ name, status }) {
    return (
        <Card className="mt-1">
            <CardBody>
            <CardText>{name} <Badge color="primary">{status}</Badge></CardText>
            <Button size="md">Edit</Button>
            </CardBody>
        </Card>
    );
}