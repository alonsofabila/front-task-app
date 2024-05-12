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

    const getStatusIcon = () => {
        switch (task.status) {
            case 1: return (
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-clock-pause" width="44" height="44"
                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20.942 13.018a9 9 0 1 0 -7.909 7.922"/>
                    <path d="M12 7v5l2 2"/>
                    <path d="M17 17v5"/>
                    <path d="M21 17v5"/>
                </svg>
            );
            case 2: return (
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-clock-play" width="44" height="44"
                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 7v5l2 2"/>
                    <path d="M17 22l5 -3l-5 -3z"/>
                    <path d="M13.017 20.943a9 9 0 1 1 7.831 -7.292"/>
                </svg>
            );
            case 3: return (
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-clock-check" width="44" height="44"
                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20.942 13.021a9 9 0 1 0 -9.407 7.967"/>
                    <path d="M12 7v5l3 3"/>
                    <path d="M15 19l2 2l4 -4"/>
                </svg>
            );
            default:
                return null
        }
    }

    const redirectToEditTask = () => {
        setEditIsShown(!editIsShown)
    };

    return (
        <div>
            <section className="mt-2 pt-1">
                <article
                    className="rounded-3xl bg-white shadow-sm w-[320px] h-[360px] p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="rounded-lg bg-[#F4F6F9] py-2 px-3 text-2xl">
                                { getStatusIcon() }
                            </span>
                            <span className="text-sm font-light text-[#757575]">{formatedCreatedAtDate}</span>
                        </div>

                        <div className="mt-6">
                            <h2 className="font-bold">{task.title}</h2>
                            <p className="mt-3 text-sm font-light text-[#424242]">{task.content}</p>
                        </div>

                        <div className="mt-12">
                            <p>{taskStatus ? taskStatus.label : 'Unknown'}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                            onClick={ redirectToEditTask }
                        >
                            Edit Task
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete Task
                        </button>

                        {editIsShown &&
                            < EditTask task={task} setEditIsShown={setEditIsShown}/>
                        }
                    </div>
                </article>
            </section>
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
