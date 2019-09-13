import React from 'react';
import './index.css';
import img from './images/gow.jpg'

function GamelistItem(props)
{
    if(props.expanded)
    {
        return (
            <li className="item-expanded">
                <div className="row">
                    <div className="col-12">
                        <div className="section">
                            <img src={img} alt="game" className="image"></img>
                            <h5>{props.data[props.keyValue].name}</h5>
                            <a href="#"><h6>{props.data[props.keyValue].store}: {props.data[props.keyValue].price}</h6></a>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Vestibulum quis est lacinia, lacinia urna quis, feugiat eros. Sed dictum vulputate sapien, vitae tincidunt sapien tempus eu. 
                                Suspendisse vestibulum rhoncus velit eget fermentum. Nam varius, lectus vel bibendum convallis, justo arcu hendrerit nisi, vel tempus tortor est at tortor.
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
    else
    {
        return (
            <li className="item">
                <button onClick={props.onClick}>
                    <div className="row">
                        <div className="col-auto">
                            <div className="section">
                                <h5>{props.data[props.keyValue].name}</h5>
                                <h6>Prices: {props.data[props.keyValue].price}</h6>
                            </div>
                        </div>
                    </div>
                </button>
            </li>
        );
    }
}

class GameList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            itemList: Array(this.props.items),
            expandedItem: undefined,
            update: false
        }
    }

    expandItem(key)
    {
        let newItemList = this.state.itemList.slice();

        if(this.state.expandedItem !== undefined)
        {
            let eKey = this.state.expandedItem;

            newItemList[eKey] = <GamelistItem 
                                    key={eKey}
                                    keyValue={eKey} 
                                    onClick={() => this.expandItem(eKey)} 
                                    data={this.props.data} 
                                    expanded={false} 
                                    />
        }

        newItemList[key] = <GamelistItem 
                                key={key}
                                keyValue={key} 
                                data={this.props.data} 
                                expanded={true} 
                                />

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
            let expand = false;
            if(i === this.state.expandedItem)
            {
                expand = true;
            }
            newItemList[i] = <GamelistItem 
                                key={i}
                                keyValue={i} 
                                onClick={() => this.expandItem(i)} 
                                data={this.props.data} 
                                expanded={expand} 
                                />
        }

        this.setState({
            itemList: newItemList
        });
    }

    componentDidUpdate()
    {
        if(this.props.refresh)
        {
            this.setState({
                itemList: [],
                update: true
            });
        }
        if(this.state.update)
        {
            this.setState({
                update: false
            })
            this.createList();
        }
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