import React from 'react';
import GameList from './GameList'

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            local_data: 
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
            ],
            search_value: "",
            refresh_gamelist: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Form Handling
    handleChange(event)
    {
        this.setState({
            search_value: event.target.value,
        });
    }

    handleSubmit(event)
    {
        event.preventDefault();
        const that = this;
        fetch("http://localhost:8000/api/?search="+this.state.search_value, {
            method: 'GET'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            that.setState({
                local_data: myJson,
                search_value: "",
                refresh_gamelist: true
            });
        })
        .catch(console.log)
    }

    componentDidUpdate()
    {
        if(this.state.refresh_gamelist)
        {
            this.setState({
                refresh_gamelist: false
            });
        }
    }

    render()
    {
        return (
            <div>
                <div className="container text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <input 
                                    type="text" 
                                    id="search-input" 
                                    name="search" 
                                    className="form-control" 
                                    placeholder="Search" 
                                    value={this.state.search_value} 
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="col-auto text-left">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <GameList 
                    items={this.state.local_data.length} 
                    data={this.state.local_data} 
                    refresh={this.state.refresh_gamelist} 
                />
            </div>
        );
    }
}

export default App;