import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { TOAST_ERROR_STYLE, TOAST_SUCCESS_STYLE } from "../../constants.js";
import api from "../../api/api.js";
import PropTypes from "prop-types";


export default function RegisterForm({ route }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(route, {
                'first_name': firstName,
                'last_name': lastName,
                'username': username,
                'email': email,
                'password': password}
            );

            if (response.status === 201) {
                navigate('/login');
                toast.success('User registered successfully.', TOAST_SUCCESS_STYLE);
            }
        } catch (error) {
            toast.error('Unable to register user', TOAST_ERROR_STYLE);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="form-container"
        >
            <h1>Register</h1>

            <div>
                <label htmlFor="firstname">First Name</label>
                <div>
                    <input
                        id="firstname"
                        className="form-input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="lastname">Last Name</label>
                <div>
                    <input
                        id="lastname"
                        className="form-input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </div>
            </div>

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
                <label htmlFor="email">Email</label>
                <div>
                    <input
                        id="email"
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
                <button className="form-button" type="submit">Register</button>
            </div>

        </form>
    )
}

RegisterForm.propTypes = {
    route: PropTypes.string.isRequired,
}
