import React, { Component } from 'react';
import axios from 'axios';




class JokeList extends Component{
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = {jokes: []}
    }
    async componentDidMount() {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get("http://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            });          
            jokes.push(res.data.joke);
            console.log(res.data.joke);
        }
      this.setState({jokes: jokes})
    }
    render() {
        return (
            <div className="Jokelist">
                <h1>Dad Jokes</h1>
                <div className="Jokelist-jokes">
                    {
                        this.state.jokes.map( j => (
                            <div>
                                {j}
                            </div>
                        ) )
                    }
                    
                </div>
            </div>
        )
    }
}


export default JokeList;