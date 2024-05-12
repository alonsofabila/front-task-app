import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { STATUS_OPTIONS, TOAST_SUCCESS_STYLE, TOAST_ERROR_STYLE } from "../../constants.js";
import api from "../../api/api.js";
import PropTypes from "prop-types";


export default function CreateTaskForm({ route, method, task, setEditIsShown }) {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [taskStatus, setTaskStatus] = useState(1)

    const navigate = useNavigate();

    const name = method === 'Create' ? 'Create' : 'Edit'

    useEffect(() => {
        if (name === 'Edit' && task) {
            setTitle(task.title);
            setContent(task.content);
            setTaskStatus(task.status);
        }
    }, [name, task]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (method === 'Create') {
                const createTask = await api.post(route, {
                    title: title,
                    content: content,
                    status: taskStatus
                })

                if (createTask.status === 201) {
                    toast.success('Task created.', TOAST_SUCCESS_STYLE);
                    navigate('/')
                } else {
                    toast.error('Failed to create task.', TOAST_ERROR_STYLE);
                }
            } else {
                const updateTask = await api.put(`${route}${task.id}/`, {
                    title: title,
                    content: content,
                    status: taskStatus
                })

                if (updateTask.status === 200) {
                    toast.success('Task updated.', TOAST_SUCCESS_STYLE);
                    setEditIsShown(false)
                    setTimeout(() => {
                        window.location.reload();
                    }, 500)
                } else {
                    toast.error('Failed to update task', TOAST_ERROR_STYLE);
                }

            }

        } catch (e) {
            toast.error(e.message, TOAST_ERROR_STYLE);
        }
    }

    const handleCancel = () => {
        navigate('/')
    }

    return (

        <>
            {name === 'Create' ?
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md">

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Create Task
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >

                                <div>
                                    <label htmlFor="title">Title</label>
                                    <div>
                                        <input
                                            id="title"
                                            type="text"
                                            required={true}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="content">Content</label>
                                    <div>
                                <textarea
                                    id="content"
                                    value={content}
                                    required={false}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="task-status">Status</label>
                                    <div>
                                        <select
                                            id="task-status"
                                            value={taskStatus}
                                            required={true}
                                            onChange={(e) => setTaskStatus(+e.target.value)}
                                            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            {STATUS_OPTIONS.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        type="submit"
                                    >
                                        {name === 'Create' ? 'Create' : 'Save'}
                                    </button>
                                </div>

                                <div>
                                    <button onClick={handleCancel}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                :

                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    <div className="flex items-center justify-center min-h-screen w-[600px]">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:max-w-md">

                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Edit Task
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >

                                    <div>
                                        <label htmlFor="title">Title</label>
                                        <div>
                                            <input
                                                id="title"
                                                type="text"
                                                required={true}
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="content">Content</label>
                                        <div>
                                <textarea
                                    id="content"
                                    value={content}
                                    required={false}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="task-status">Status</label>
                                        <div>
                                            <select
                                                id="task-status"
                                                value={taskStatus}
                                                required={true}
                                                onChange={(e) => setTaskStatus(+e.target.value)}
                                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                {STATUS_OPTIONS.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            type="submit"
                                        >
                                            {name === 'Create' ? 'Create' : 'Save'}
                                        </button>
                                    </div>

                                    <div>
                                        <button onClick={() => {
                                            setEditIsShown(false)
                                        }}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

CreateTaskForm.propTypes = {
    route: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    task: PropTypes.object,
    setEditIsShown: PropTypes.func,
}
