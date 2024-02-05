import React from 'react'
import { Outlet } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import { useSelector } from 'react-redux';

export default function LoggedInRoutes() {
    const {user} = useSelector((state)=>({...state}));
    return user ? <Outlet/> : <HomePage/>;
}
