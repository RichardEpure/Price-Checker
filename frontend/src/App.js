import React from 'react';
import GameList from './GameList'

class App extends React.Component
{
    render()
    {
        var data = 
        [
            {
                "name": "God of war",
                "store": "SEEX",
                "price": "0.99"
            },
            {
                "name": "Eternal Quest",
                "store": "unknown",
                "price": "99.99"
            },
            {
                "name": "CSGO",
                "store": "steam",
                "price": "6.99"
            }
        ];

        return (
            <GameList 
                items={data.length}
                data={data}
            />
        );
    }
}

export default App;