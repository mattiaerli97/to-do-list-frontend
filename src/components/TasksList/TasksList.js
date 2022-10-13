import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import './TasksList.css';
import UrgencyIcon from '../UrgencyIcon/UrgencyIcon'

const TasksList = () => {
    const [tasks, setTask] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const response = await axios.get('https://to-do-list-api-node.herokuapp.com/tasks');
        setTask(response.data);
    }

    const onChangeDone = async (task) => {
        await axios.patch(`https://to-do-list-api-node.herokuapp.com/tasks/${task.id}/done`, {
          done: !task.done
        });
        getTasks();
    }

    return (
        <div className="tasks-list">
            <Link to="/add">
              <button className="btn btn-primary">Add New</button>
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Content</th>
                        <th>Urgency</th>
                        <th>Done</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { tasks.map((task, index) => (
                        <tr key={ task.id }>
                            <td>{ task.content }</td>
                            <td><UrgencyIcon urgency={ task.urgency } /></td>
                            <td>
                              <input className="form-check-input" type="checkbox" value="" id={'done_' + task.id} checked={task.done} onChange={() => onChangeDone(task)} />
                            </td>
                            <td>
                                <Link to={`/edit/${task.id}`}><button className="btn btn-primary">Edit</button></Link>
                            </td>
                        </tr>
                    )) }

                </tbody>
            </table>
        </div>
    )
}

export default TasksList
