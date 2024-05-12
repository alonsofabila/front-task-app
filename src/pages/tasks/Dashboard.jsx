import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../../components/task-components/TaskCard.jsx";
import { toast } from "react-hot-toast";
import { TOAST_SUCCESS_STYLE, TOAST_ERROR_STYLE } from "../../constants.js";
import api from "../../api/api.js";


export function Dashboard() {
    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        getTasks()
    }, []);

    const getTasks = () => {
        api.get('tasks/api/v1/task/').then(response => {

            setTasks(response.data.results);
            console.log(response.data);

            const userId = response.data.results[0]?.created_by?.id;

            if (userId) {
                api.get(`users/api/v1/user/${userId}`).then(response => {
                    setUser(response.data);
                }).catch(error => toast.error(error.message));
            }

        }).catch(error => {
            toast.error(error.message);
        })
    }

    const deleteTask = (id) => {
        api.delete(`tasks/api/v1/task/${id}`).then((res) => {
            if (res.status === 204) {
                toast.success("Task deleted!", TOAST_SUCCESS_STYLE);
                getTasks()
            } else {
                toast.error("Error deleting task", TOAST_ERROR_STYLE);
            }
        }).catch((error) => {
            toast.error(error.message, TOAST_ERROR_STYLE);
        })
    }

    const redirectToCreateTask = () => {
        navigate("/create-task");
    }

    const redirectToLogout = () => {
        navigate("/logout");
    }

    return (
        <div>
            <h2>{user.username ? user.username : 'user'} task´s list</h2>
            <button onClick={ redirectToLogout }>Log out</button>
            <button onClick={ redirectToCreateTask } >Create Task</button>
            {tasks.map((task) => (
                <TaskCard key={ task.id } task={ task } onDelete={ deleteTask } />
            ))}
        </div>
    );
}
