import React, { useState } from 'react';
import "../Todo.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const ToDoApp = () => {
    const dayNum = new Date().toLocaleString('default', { day: "numeric" });
    const year = new Date().toLocaleString('default', { year: "numeric" });
    const month = new Date().toLocaleString('default', { month: 'short' });
    const day = new Date().toLocaleString('default', { weekday: 'long' });

    // Date picker

    // const [inputData, setInputData] = useState("");

    const [state, setState] = useState({
        taskId: '',
        inputData: '',
        taskTitle: '',
        dueDate: ''
    })

    const handleChange = (event) => {
        const value = event.target.value;
        setState({
            ...state, [event.target.name]: value
        });
    }

    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (state.inputData != "" && state.taskTitle != "" && state.dueDate != "") {

            let ToDate = new Date();

            if (new Date(state.dueDate).getTime() <= ToDate.getTime()) {
                alert("The Date must be Bigger or Equal to today date");
                return false;
            }
            else {
                setTasks([...tasks, { 'task': state.inputData, 'title': state.taskTitle, 'dueDate': state.dueDate }])
                setState({ taskId: '', inputData: '', taskTitle: '', dueDate: '' });
            }

        }
        else {
            alert("Empty fields found!")
        }
    }

    const editTask = (index, task) => {
        // alert("Edit task " + task)
        setState({ taskId: index, inputData: task.task, taskTitle: task.title, dueDate: task.dueDate });
        document.getElementById('add-btn').style.display = "none";
        document.getElementById('edit-btn').style.display = "block";
        document.getElementById('cancel-edit-btn').style.display = "block";
    }

    const updateTask = () => {
        const taskId = document.getElementById('task-id').value;
        let current_task = { ...tasks[taskId] };

        current_task.task = state.inputData;
        current_task.title = state.taskTitle;
        current_task.dueDate = state.dueDate;

        let ToDate = new Date();

        if (new Date(current_task.dueDate).getTime() <= ToDate.getTime()) {
            alert("The Date must be Bigger or Equal to today date");
            return false;
        }
        else {
            tasks[taskId] = current_task;
        }

        setState({ taskId: '', inputData: '', taskTitle: '', dueDate: '' });
        document.getElementById('add-btn').style.display = "block";
        document.getElementById('edit-btn').style.display = "none";
        document.getElementById('cancel-edit-btn').style.display = "none";
    }

    const cancelEditTask = () => {
        setState({ inputData: '', taskTitle: '', dueDate: '' });

        document.getElementById('add-btn').style.display = "block";
        document.getElementById('edit-btn').style.display = "none";
        document.getElementById('cancel-edit-btn').style.display = "none";
    }

    const deleteTask = (ind) => {
        const updatedItems = tasks.filter((element, index) => {
            return index !== ind;
        });

        confirmAlert({
            title: 'Delete Task',
            message: 'Are you sure want to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => setTasks(updatedItems)
                },
                {
                    label: 'No',
                    // onClick: () => alert('Task not deleted')
                }
            ]
        });
    }

    return (
        <div className="main-div">
            <div className='top-container'>
                {/* Date Heading */}
                <div className='date-wrapper'>
                    <div className='date-container'>
                        <h2>{dayNum}</h2>
                        <div className='date-inner-container'>
                            <h3>{month}</h3>
                            <h4>{year}</h4>
                        </div>
                    </div>

                    <p>{day}</p>
                </div>

                {/* Adding Tasks */}
                <div className="add-item">
                    <div className='task-info'>
                        <input type="text" placeholder='Add Task Title ...' name="taskTitle" value={state.taskTitle} onChange={handleChange} />
                        <input type="date" name="dueDate" value={state.dueDate} onChange={handleChange} />
                    </div>
                    <div className='add-item-box'>
                        <input type="text" id="task-id" name="taskId" value={state.taskId} onChange={handleChange} readOnly />

                        <input type="text" placeholder='Add Task ...' name="inputData" value={state.inputData} onChange={handleChange} />
                        <button type="submit" onClick={addTask} id="add-btn"><i className="fa-solid fa-plus"></i></button>
                        <button type="submit" onClick={updateTask} id="edit-btn"><i className="fa-solid fa-check"></i></button>
                        <button type="submit" onClick={cancelEditTask} id="cancel-edit-btn"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>

            {/* Showing Tasks */}
            <div className='show-items'>
                {
                    tasks.map((task, index) => {
                        return (
                            <div className='each-item-container' key={index}>
                                <div className='task-title'>
                                    <h6>{task.title}</h6>
                                    <p>{task.dueDate}</p>
                                </div>

                                <div className='each-item'>
                                    <p>{task.task}</p>

                                    <div className='icon-container'>
                                        <i className="fa-solid fa-pencil edit-icon" onClick={() => editTask(index, task)}></i>
                                        <i className="fa-solid fa-trash-can delete-icon" onClick={() => deleteTask(index)}></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ToDoApp;