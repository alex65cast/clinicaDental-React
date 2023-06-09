
import React from 'react';

import {Routes, Route, Navigate} from 'react-router-dom';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Appointments } from '../Appointments/Appointments';
import { NewAppointment } from '../NewAppointment/NewAppointment';
import { ModalEditQuote } from '../ModalEditQuote/modalEditQuote';
import "./Body.css"
import { Admin } from '../Admin/Admin';

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/admin" element={<Admin />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/modalEdit" element={<ModalEditQuote />}/>
                <Route path="/appointments" element={<Appointments />}/>
                <Route path="/newappointments" element={<NewAppointment />}/>
            </Routes>
        </>
    )
}