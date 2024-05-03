import { useState } from "react";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants.js";
import PropTypes from "prop-types";
import "./PACO.css";


export default function LogInForm({ route }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await api.post(route, {
                username,
                password}
            );

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/")
            }

        } catch (e) {
            alert(`Error: ${e.response.data.detail}`);
        } finally {
            setLoading(false);
        }
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

        </form>
    )
}

LogInForm.propTypes = {
    route: PropTypes.string.isRequired,
}
