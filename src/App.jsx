import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from "./pages/NotFound.jsx";
import { LogIn } from "./pages/user/LogIn.jsx";
import { Register } from "./pages/user/Register.jsx";
import { Home } from "./pages/tasks/Home.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { CreateTask } from "./pages/tasks/CreateTask.jsx";
import { Toaster } from "react-hot-toast";


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
            <div className="container mx-auto h-full font-primaryRegular">
                <Routes>
                    <Route path='*' element={<NotFound />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/register" element={<RegisterAndLogout />} />
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <Home />
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
                <Toaster />
            </div>
        </BrowserRouter>
    )
}

export default App;