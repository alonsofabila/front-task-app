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
        <form
            onSubmit={handleSubmit}
            className="form-container"
        >
            <h1>{name} Task</h1>

            <div>
                <label htmlFor="title">Title</label>
                <div>
                    <input
                        id="title"
                        className="form-input"
                        type="text"
                        value={title}
                        required={true}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <div>
                    <textarea
                        id="content"
                        className="form-input"
                        value={content}
                        required={true}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                    ></textarea>
                </div>
            </div>

            <div>
                <label htmlFor="task-status">Status</label>
                <div>
                    <select
                        id="task-status"
                        className="form-input"
                        value={taskStatus}
                        required={true}
                        onChange={(e) => setTaskStatus(+e.target.value)}
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
                <button className="form-button" type="submit">{name === 'Create' ? 'Create' : 'Save'}</button>
            </div>

            {name === 'Create' ?
                <div>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
                :
                <div>
                    <button onClick={() => {setEditIsShown(false)}}>Cancel</button>
                </div>
            }


</form>
)
}

CreateTaskForm.propTypes = {
    route: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    task: PropTypes.object,
    setEditIsShown: PropTypes.func,
}
