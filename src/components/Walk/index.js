import React from "react";
import UserQuestions from './UserQuestions';
import LandingPage from './LandingPage';
import ResultsPage from './ResultsPage';

const START_PAGE = 0;
const QUESTIONS_PAGE = 1;
const RESULTS_PAGE = 2;

export default class Walk extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            pageIndex: QUESTIONS_PAGE,
        };
    }

    componentDidMount(){
        // User would land on this page once they scan a QR code.
        // Then we would use websockets to connect and get event details
        this.setState({
            pageIndex: QUESTIONS_PAGE
        });
    }

    handleNextPage(page){
        this.setState({pageIndex: page});
    }

    render(){
        switch(this.state.pageIndex){
            case START_PAGE:
                return (
                    <LandingPage 
                        goNextPage={() => this.handleNextPage(QUESTIONS_PAGE)} 
                    />
                );
            case QUESTIONS_PAGE:
                return (
                    <UserQuestions 
                        goNextPage={() => this.handleNextPage(RESULTS_PAGE)} 
                    />
                );
            case RESULTS_PAGE:
                return (
                    <ResultsPage />
                );
        }
    }
}