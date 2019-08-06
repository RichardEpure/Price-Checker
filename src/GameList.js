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

    collapsedItem(key)
    {
        return(
            <li key={key} className="gamelist-item">
                <button onClick={() => this.expandItem(key)}>
                    <div className="row">
                        <div className="col-auto">
                            <h5>{this.props.data[key].name}</h5>
                            <h6>Prices: {this.props.data[key].price}</h6>
                        </div>
                    </div>
                </button>
            </li>
        );
    }

    expandItem(key)
    {
        let newItemList = this.state.itemList.slice();

        if(this.state.expandedItem !== undefined)
        {
            let eKey = this.state.expandedItem;

            newItemList[eKey] = this.collapsedItem(eKey);
        }

        newItemList[key] =
            <li key={key} className="gamelist-item-expanded">
                <div className="row">
                    <div className="col-12">
                    <img src={"images/gow.jpg"} alt="game" className="gamelist-image"></img>
                        <h5>{this.props.data[key].name}</h5>
                        <a href="#"><h6>{this.props.data[key].store}: {this.props.data[key].price}</h6></a>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vestibulum quis est lacinia, lacinia urna quis, feugiat eros. Sed dictum vulputate sapien, vitae tincidunt sapien tempus eu. 
                            Suspendisse vestibulum rhoncus velit eget fermentum. Nam varius, lectus vel bibendum convallis, justo arcu hendrerit nisi, vel tempus tortor est at tortor.
                        </p>
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
            newItemList[i] = this.collapsedItem(i);
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
