import React from 'react';
import ReactDOM from 'react-dom';

// Components 
import Clock from './components/clock/Clock';
import Task from './components/task/Task';

// CSS
import './styles/reset.scss';
import './styles/global.scss';

const App = () => {
    return (
        <div className="main">
            <Clock/>
            <Task />
            <div className="author">
                <h1>Designed and Created by <a href="https://github.com/AnsellMaximilian">Ansell Maximilian</a></h1>
                <i className="fab fa-github"></i>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)