import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import './TasksList.css';

const TasksList = () => {
    const [tasks, setTask] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const response = await axios.get('https://to-do-list-api-node.herokuapp.com/tasks');
        setTask(response.data);
    }

    return (
        <div>
            <Link to="/add">Add New</Link>
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
                            <td>{ task.urgency }</td>
                            <td><input className="form-check-input" type="checkbox" value="" id={'done_' + task.id} checked={task.done} /></td>
                            <td>
                                <Link to={`/edit/${task.id}`}>Edit</Link>
                            </td>
                        </tr>
                    )) }

                </tbody>
            </table>
        </div>
    )
}

export default TasksList
