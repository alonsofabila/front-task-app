import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import PropTypes from "prop-types";
import api from '../api/api.js'


export function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        auth().catch(() => {
            setIsAuthenticated(false);
        })
    }, [])

    const refreshToken = async () => {

        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {

            const response = await api.post(`users/api/v1/token/refresh/`, {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

        } catch (error) {
            console.log(error)
            setIsAuthenticated(false);
        }

    }

    const auth = async () => {

        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthenticated(false);
            return false
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = (Date.now() / 1000);

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
        }

    }

    if (isAuthenticated === null) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? children : <Navigate to='/login' />
}


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}
