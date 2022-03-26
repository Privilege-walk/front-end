import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        token: state.token,
        finishedAuthCheck: state.finishedAuthCheck
    };
}

const mapDispatchToProps = {
    
};

const ProtectedRoute = ({ redirectPath = '/login' }) => {
    let token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedRoute);