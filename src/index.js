import React from 'react';
import ReactDOM from 'react-dom';

// Components 
import Clock from './components/clock/Clock';

// CSS
import './styles/reset.scss';
import './styles/global.scss';

const App = () => {
    return (
        <Clock/>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)