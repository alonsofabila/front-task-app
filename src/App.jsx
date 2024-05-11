import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from "./pages/NotFound.jsx";
import { LogIn } from "./pages/user/LogIn.jsx";
import { Register } from "./pages/user/Register.jsx";
import { Dashboard } from "./pages/tasks/Dashboard.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { CreateTask } from "./pages/tasks/CreateTask.jsx";


function LogOut() {
    localStorage.clear()
    return <Navigate to="/login" />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route
                    path='/'
                    element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path='/create-task'
                    element={
                        <ProtectedRoute>
                            <CreateTask />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App;