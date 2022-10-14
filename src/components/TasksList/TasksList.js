import { useState, useEffect, useCallback } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import './TasksList.css';
import UrgencyIcon from '../UrgencyIcon/UrgencyIcon'
import { moreUrgentFirst, lessUrgentFirst, doneFirst, toDoFirst } from './Params.js'

const TasksList = () => {
    const [tasks, setTask] = useState([])
    const [orderBy, setOrderBy] = useState(window.localStorage.getItem('orderBy') ? window.localStorage.getItem('orderBy') : 1)
    const [hideDone, setHideDone] = useState(window.localStorage.getItem('hideDone') && window.localStorage.getItem('hideDone') === "true" ? true : false)

    const onChangeOrderBy = useCallback((value) => {
      setOrderBy(value)
      window.localStorage.setItem('orderBy', value)
      switch (value) {
        case "1":
          getTasks(moreUrgentFirst())
          break;
        case "2":
          getTasks(lessUrgentFirst())
          break;
        case "3":
          getTasks(doneFirst())
          break;
        case "4":
          getTasks(toDoFirst())
          break;
        default:

      }
    }, [])

    useEffect(() => {
        onChangeOrderBy(orderBy.toString())
    }, [onChangeOrderBy, orderBy]);

    const getTasks = async (params) => {
        const response = await axios.get('https://to-do-list-api-node.herokuapp.com/tasks?' + (params || ''));
        setTask(response.data);
    }

    const onChangeDone = async (task) => {
        await axios.patch(`https://to-do-list-api-node.herokuapp.com/tasks/${task.id}/done`, {
          done: !task.done
        });
        onChangeOrderBy(orderBy.toString());
    }

    const onChangeHideDone = (value) => {
      setHideDone(value)
      window.localStorage.setItem('hideDone', value)
      onChangeOrderBy(orderBy.toString())
    }

    return (
        <div className="tasks-list">
            <div className="list-header">
              <Link to="/add">
                <button className="btn btn-primary">Add New</button>
              </Link>
              <div className="filters">
                <span>Order by</span>
                <select className="form-control" onChange={e => onChangeOrderBy(e.target.value)} value={orderBy}>
                  <option value="1">More urgent first</option>
                  <option value="2">Less urgent first</option>
                  <option value="3">Done first</option>
                  <option value="4">To do first</option>
                </select>
                <span>Hide done</span>
                <input className="form-check-input" type="checkbox" value="" id="hide_done" checked={hideDone} onChange={(e) => onChangeHideDone(e.target.checked)} />
              </div>
            </div>
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
                            <td>
                              <div className="cell">{ task.content }</div>
                            </td>
                            <td>
                              <div className="cell"><UrgencyIcon urgency={ task.urgency } /></div>
                            </td>
                            <td>
                              <div className="cell"><input className="form-check-input" type="checkbox" value="" id={'done_' + task.id} checked={task.done} onChange={() => onChangeDone(task)} /></div>
                            </td>
                            <td>
                              <div className="cell"><Link to={`/edit/${task.id}`}><button className="btn btn-primary">Edit</button></Link></div>
                            </td>
                        </tr>
                    )) }

                </tbody>
            </table>
        </div>
    )
}

export default TasksList
