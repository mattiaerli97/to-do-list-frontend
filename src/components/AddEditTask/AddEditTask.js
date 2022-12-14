import axios from "axios";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './AddEditTask.css'

const AddEditTask = ({ isEdit }) => {
    const [content, setContent] = useState('');
    const [urgency, setUrgency] = useState(1);
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      async function fetchData() {
        if (isEdit) {
          const response = await axios.get(`https://to-do-list-api-node.herokuapp.com/tasks/${id}`);
          setContent(response.data.content);
          setUrgency(response.data.urgency);
        }
      }
      fetchData()
    }, [id, isEdit]);

    const saveUpdateTask = async(e) => {
      e.preventDefault();
      if (isEdit) {
        await axios.patch(`https://to-do-list-api-node.herokuapp.com/tasks/${id}`,{
            content: content,
            urgency: urgency
        });
      } else {
        await axios.post('https://to-do-list-api-node.herokuapp.com/tasks',{
            content: content,
            urgency: urgency
        });
      }
      history("/");
    }

    const onChangeUrgency = (value) => {
      setUrgency(value);
    }

    return (
        <div className="add-edit-form">
            <form onSubmit={ saveUpdateTask }>
                <div className="form-group">
                    <label className="label">Content</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Content"
                        value={ content }
                        onChange={ (e) => setContent(e.target.value) }
                    />
                </div>

                <div className="form-group">
                  <label className="label">Urgency</label>
                  <select className="form-control" onChange={e => onChangeUrgency(e.target.value)} value={urgency}>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">{ isEdit ? 'Update' : 'Save'}</button>
            </form>
        </div>
    )
}

export default AddEditTask
