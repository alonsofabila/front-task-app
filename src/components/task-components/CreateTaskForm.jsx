import { useState } from "react";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


export default function CreateTaskForm({ route }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [taskStatus, setTaskStatus] = useState(1)

    const navigate = useNavigate();

    const statusOptions = [
        {
            value: 1,
            label: "Pending",
        },
        {
            value: 2,
            label: "In Progress",
        },
        {
            value: 3,
            label: "Done",
        },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const createTask = await api.post(route, {
                title: title,
                content: content,
                status: taskStatus
            })

            if (createTask.status === 201) {
                alert('Task Created');
                navigate("/")
            } else {
                alert('Failed to create task');
            }

        } catch (e) {
            alert(`Error: ${e.response.data.detail}`);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="form-container"
        >
            <h1>Create Task</h1>

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
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <button className="form-button" type="submit">Create</button>
            </div>

        </form>
    )
}

CreateTaskForm.propTypes = {
    route: PropTypes.string.isRequired,
}
