import React, { useState } from "react";
import UserQuestions from './UserQuestions';
import LandingPage from './LandingPage';
import ResultsPage from './ResultsPage';
import { useParams } from 'react-router-dom';


const START_PAGE = 0;
const QUESTIONS_PAGE = 1;
const RESULTS_PAGE = 2;

function Walk(){
    
    const [pageIndex, setPageIndex] = useState(START_PAGE);

    const { eventId } = useParams();

    // User would land on this page once they scan a QR code.
    // Then we would use websockets to connect and get event details
    switch(pageIndex){
        case START_PAGE:
            return (
                <LandingPage 
                    goNextPage={() => setPageIndex(QUESTIONS_PAGE)} 
                />
            );
        case QUESTIONS_PAGE:
            return (
                <UserQuestions 
                    goNextPage={() => setPageIndex(RESULTS_PAGE)} 
                />
            );
        case RESULTS_PAGE:
            return (
                <ResultsPage />
            );
    }
    
}

export default Walk;