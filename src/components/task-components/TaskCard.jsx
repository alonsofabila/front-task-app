import { STATUS_OPTIONS } from "../../constants.js";
import PropTypes from "prop-types";
import { useState } from "react";
import { EditTask } from "../../pages/tasks/EditTask.jsx";

export function TaskCard({ task, onDelete }) {

    const [editIsShown, setEditIsShown] = useState(false);

    const formatedCreatedAtDate = new Date(task.created_at).toLocaleDateString('en-US');
    const taskStatus = STATUS_OPTIONS.find((option) =>
        option.value === task.status
    );

    const redirectToEditTask = () => {
        setEditIsShown(!editIsShown)
    };

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.content}</p>
            <p>{formatedCreatedAtDate}</p>
            <p>status: {taskStatus ? taskStatus.label : 'Unknown'}</p>
            <button onClick={ redirectToEditTask }>
                Edit Task
            </button>
            <button onClick={() => onDelete(task.id)}>
                Delete Task
            </button>

            {editIsShown &&
                < EditTask task={task} setEditIsShown={setEditIsShown} />
            }
        </div>


    );
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired
};
