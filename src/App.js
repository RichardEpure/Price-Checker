import React from 'react';
import ReactDOM from 'react-dom';
import GameList from './GameList'

class App extends React.Component
{
    render()
    {
        return (
            <GameList 
                items={5}
            />
        );
    }
}

export default App;