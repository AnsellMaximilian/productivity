import React, {useState} from 'react'

import style from './styles/task.module.scss';

export default function Task() {

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [input, setInput] = useState('');

    const addTask = () => {
        if(input) {
            setTasks(tasks => {
                const newTasks = [...tasks, {id: Math.random(), title: input, done: false}];
                localStorage.setItem('tasks', JSON.stringify(newTasks));
                return newTasks;
            });
            setInput('');
        }
    }

    const toggleTaskStatus = (id) => {
        setTasks(tasks => {
            const newTasks = tasks.map(task => {
                if(task.id === id) task.done = !task.done;
                return task;
            })
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        })
    }

    const deleteTask = (id) => setTasks(tasks => {
        const newTasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        return newTasks;
    });

    const handleChange = (e) => setInput(e.target.value);

    return (
        <div className={style.task}>
            <h1>Your Tasks</h1>
            <ul className={style.list}>
                {
                    tasks.map(task => {
                        return (
                            <li key={task.id} style={task.done ? {textDecoration: "line-through"} : {}} 
                                onClick={() => toggleTaskStatus(task.id)}
                                onDoubleClick={() => deleteTask(task.id)}
                            >
                                {task.title}
                            </li>
                        )
                    })
                }
            </ul>
            <form onSubmit={(e) => {e.preventDefault(); addTask();}}>
                <input className={style['add-input']} onChange={handleChange} value={input}/>
            </form>
            <span className={style.add} onClick={addTask}>Add Task</span>
        </div>
    )
}
