import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ACCESS_TOKEN, REFRESH_TOKEN, TOAST_SUCCESS_STYLE, TOAST_ERROR_STYLE } from "../../constants.js";
import api from "../../api/api.js";
import PropTypes from "prop-types";


export default function LogInForm({ route }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(route, {
                username,
                password}
            );

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                toast.success('Log in success', TOAST_SUCCESS_STYLE);
                navigate("/")
            }

        } catch (e) {
            toast.error('Username or Password is incorrect', TOAST_ERROR_STYLE);
        }
    }

    const redirectToRegister = () => {
        navigate("/register");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="form-container"
        >
            <h1>Log In</h1>

            <div>
                <label htmlFor="username">Username</label>
                <div>
                    <input
                        id="username"
                        className="form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <div>
                    <input
                        id="password"
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button className="form-button" type="submit">Login</button>
            </div>

            <div>
                <button onClick={ redirectToRegister }>Register</button>
            </div>

        </form>
    )
}

LogInForm.propTypes = {
    route: PropTypes.string.isRequired,
}
