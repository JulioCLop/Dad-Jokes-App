import React, { Component } from 'react';
import axios from 'axios';
import './jokelist.style.css';
import Joke from './joke.component';
import { v4 as uuidv4 } from 'uuid';




class JokeList extends Component{
    static defaultProps = {
        numJokesToGet: 10
    };
    constructor(props) {
        super(props);
        this.state = { jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]") };
        this.handleClick = this.handleClick.bind(this)
    }
    
    async componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
    }

     async getJokes() {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get("http://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            });          
            jokes.push({id:uuidv4() ,text: res.data.joke, votes: 0});
        }
         this.setState(
             st => ({
             jokes: [...st.jokes, ...jokes]
         }),
             () =>
                 window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
     )
         window.localStorage.setItem("jokes", JSON.stringify(jokes));
     }
    
    handleClick() {
        this.getJokes()
    }

    handleVote(id,delta) {
        this.setState(st =>({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta} : j)
        }),
            ()=> window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    }
    render() {
        return (
            <div className="Jokelist">
                <div className="Jokelist-sidebar">
                    <h1 className="Jokelist-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img
                        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
                        alt="Happy face"
                    />
                    <button className="Jokelist-getmore" onClick={this.handleClick} >New Jokes</button>
                </div>
             
                <div className="Jokelist-jokes">
                    {
                        this.state.jokes.map(j => (
                            <Joke
                                key={j.id}
                                votes={j.votes}
                                text={j.text}
                                upvote={() => this.handleVote(j.id, 1)}
                                downvote={() => this.handleVote(j.id, -1)}
                            />
                        ))}
                </div>
            </div>
        );
    }
}


export default JokeList;