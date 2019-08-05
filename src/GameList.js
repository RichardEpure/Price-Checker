import React from 'react';
import ReactDOM from 'react-dom';

class GameList extends React.Component
{
    createItemList()
    {
        let itemList = [];

        for(let i=0; i<this.props.items; i++)
        {
            itemList.push(
                <li key={i} className="gamelist-item">
                    <div className="row">
                        <div className="col-auto">
                                <img src="" alt="item image" className="gamelist-image"></img>
                        </div>
                        <div className="col-auto">
                                {this.props.data[i].name}<br></br>
                                {this.props.data[i].store}<br></br>
                                {this.props.data[i].price}
                        </div>
                    </div>
                </li>
            );
        }
        return itemList;
    }

    render()
    {
        return (
            <div className="container gamelist-container">
                <div class="row justify-content-center">
                    <div class="col-auto">
                        <ul className="gamelist">
                            {this.createItemList()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameList;
