import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../../components/task-components/TaskCard.jsx";
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
            const userId = response.data.results[0].created_by;
            api.get(`users/api/v1/user/${userId}`).then(response => {
                setUser(response.data);
            }).catch(error => console.log(error));
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteTask = (id) => {
        api.delete(`tasks/api/v1/task/${id}`).then((res) => {
            if (res.status === 204) {
                alert("Task deleted");
                getTasks()
            } else {
                alert("Failed to delete task");
            }
        }).catch((error) => {
            alert(error);
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
