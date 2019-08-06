import React from 'react';
import './index.css';

class GameList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            itemList: Array(this.props.items),
            expandedItem: undefined
        }
    }

    expandItem(key)
    {
        let newItemList = this.state.itemList.slice();

        if(this.state.expandedItem !== undefined)
        {
            let eKey = this.state.expandedItem;

            newItemList[eKey] =
                <li key={eKey} className="gamelist-item">
                    <button onClick={() => this.expandItem(eKey)}>
                        <div className="row">
                            <div className="col-auto">
                                    <img src="" alt="game" className="gamelist-image"></img>
                            </div>
                            <div className="col-auto">
                                    <h5>{this.props.data[eKey].name}</h5>
                                    <h6>{this.props.data[eKey].store}</h6>
                                    <h6>{this.props.data[eKey].price}</h6>
                            </div>
                        </div>
                    </button>
                </li>;
        }

        newItemList[key] =
            <li key={key} className="gamelist-item-expanded">
                <div className="row">
                    <div className="col-auto">
                            <img src="" alt="game" className="gamelist-image"></img>
                    </div>
                    <div className="col-auto">
                            <h5>{this.props.data[key].name}</h5>
                            <h6>{this.props.data[key].store}</h6>
                            <h6>{this.props.data[key].price}</h6>
                    </div>
                </div>
            </li>;

        this.setState({
            itemList: newItemList,
            expandedItem: key
        });
    }

    createList()
    {
        let newItemList = this.state.itemList.slice();
        for(let i=0; i<this.props.items; i++)
        {
            newItemList[i] =
                <li key={i} className="gamelist-item">
                    <button onClick={() => this.expandItem(i)}>
                        <div className="row">
                            <div className="col-auto">
                                    <img src="" alt="game" className="gamelist-image"></img>
                            </div>
                            <div className="col-auto">
                                    <h5>{this.props.data[i].name}</h5>
                                    <h6>{this.props.data[i].store}</h6>
                                    <h6>{this.props.data[i].price}</h6>
                            </div>
                        </div>
                    </button>
                </li>;
        }

        this.setState({
            itemList: newItemList
        });
    }

    componentDidUpdate()
    {

    }

    componentDidMount()
    {
        this.createList();
    }

    render()
    {
        return (
            <div className="container gamelist-container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <ul className="gamelist">
                            {this.state.itemList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameList;
