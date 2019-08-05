import React from 'react';
import ReactDOM from 'react-dom';

class GameList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            items: props.items
        }
    }

    createItemList()
    {
        let itemList = [];

        for(let i=0; i<this.props.items; i++)
        {
            itemList.push(<li>item {i+1}</li>);
        }
        return itemList;
    }

    render()
    {
    

        return (
            <ul>
                {this.createItemList()}
            </ul>
        );
    }
}

export default GameList;
