import { useState } from "react";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


export default function CreateTaskForm({ route }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [taskStatus, setTaskStatus] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const createTask = await api.post(route, {
                title,
                content,
                taskStatus
            })

            if (createTask.status === 201) {
                alert('Task Created');
                navigate("/")
            } else {
                alert('Failed to create task');
            }

        } catch (e) {
            alert(`Error: ${e.response.data.detail}`);
        } finally {
            setLoading(false)
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
                <label htmlFor="task-status">Content</label>
                <div>
                    <select
                        id="task-status"
                        className="form-input"
                        value={taskStatus}
                        required={true}
                        onChange={(e) => setTaskStatus(e.target.value)}
                    >
                        <option value="1">Pending</option>
                        <option value="2">In Progress</option>
                        <option value="3">Done</option>
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
