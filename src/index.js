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
        <div>
            <Clock/>
            <Task />
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)