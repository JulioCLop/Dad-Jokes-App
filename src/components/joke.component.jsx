import React, { Component } from 'react';
import './joke.style.css';


class Joke extends Component{
    render() {
        return (
            <div className="joke">
                <div className="joke-button">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
                    <span className="joke-votes">{ this.props.votes}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
                </div>
                <div className="joke-text">
                    {this.props.text}
                </div>
                <div className="joke-smiley">
                    <i class="em em-rolling_on_the_floor_laughing"></i>
                </div>
            </div>
        )
    }
}

export default Joke;