import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../../components/task-components/TaskCard.jsx";
import { toast } from "react-hot-toast";
import {TOAST_SUCCESS_STYLE, TOAST_ERROR_STYLE} from "../../constants.js";
import api from "../../api/api.js";


export function Home() {
    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        getTasks()
    }, []);

    const getTasks = () => {
        api.get('tasks/api/v1/task/').then(response => {

            setTasks(response.data.results);

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
        <div className="p-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">{user.username ? user.username : 'user'} task´s list</h1>
                <button
                    onClick={redirectToLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                    Log out
                </button>
            </div>

            <div className="flex justify-between mb-4">
                <button
                    onClick={redirectToCreateTask}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                    Create Task
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="">
                    <h3 className="text-lg font-semibold mb-2">Pending</h3>
                    {tasks.filter((task) => task.status === 1).map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={deleteTask}/>
                    ))}
                </div>


                <div className="">
                    <h3 className="text-lg font-semibold mb-2">In Progress</h3>
                    {tasks.filter((task) => task.status === 2).map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={deleteTask}/>
                    ))}
                </div>

                <div className="">
                    <h3 className="text-lg font-semibold mb-2">Done</h3>
                    {tasks.filter((task) => task.status === 3).map((task) => (
                        <TaskCard key={task.id} task={task} onDelete={deleteTask}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
