import CreateTaskForm from "../../components/task-components/CreateTaskForm.jsx";
import PropTypes from "prop-types";


export function EditTask({ task, setEditIsShown }) {
    return (
        <CreateTaskForm route='tasks/api/v1/task/' method='Edit' task={ task } setEditIsShown ={ setEditIsShown } />
    );
}

EditTask.propTypes = {
    task: PropTypes.object.isRequired,
    setEditIsShown: PropTypes.func.isRequired,
}
