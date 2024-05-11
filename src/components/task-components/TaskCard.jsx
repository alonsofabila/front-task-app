import PropTypes from "prop-types";

export function TaskCard({ task, onDelete }) {

    const formatedCreatedAtDate = new Date(task.created_at).toLocaleDateString('en-US');

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.content}</p>
            <p>{formatedCreatedAtDate}</p>
            <p>{task.status}</p>
            <button onClick={() => onDelete(task.id)}>
                Delete Task
            </button>
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
