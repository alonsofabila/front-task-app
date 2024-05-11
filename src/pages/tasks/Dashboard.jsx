import { useState, useEffect } from "react";
import { TaskCard } from "../../components/task-components/TaskCard.jsx";
import api from "../../api/api.js";


export function Dashboard() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, []);

    const getTasks = async () => {
        try {
            const response = await api.get(`tasks/api/v1/task/`);
            console.log(response.data.results)
            setTasks(response.data.results);
        } catch (error) {
            alert(error)
        }
    }

    const deleteTask = (id) => {
        api.delete(`tasks/api/v1/task/${id}`).then((res) => {
            if (res.status === 204) {
                alert("Task deleted");
                getTasks();
            } else {
                alert("Failed to delete task");
            }
        }).catch((error) => {
            alert(error);
        })
    }

    return (
        <div>
            <h2>User Task List</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={deleteTask} />
            ))}
        </div>
    );
}
