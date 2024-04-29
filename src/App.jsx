import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TasksPage } from "./pages/tasks/TasksPage.jsx";
import { TasksFormPage } from "./pages/tasks/TasksFormPage.jsx";
import { LogIn } from "./pages/user/LogIn.jsx";
import { Navigation } from "./components/Navigation.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/tasks-create' element={<TasksFormPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;