import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import football from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state kittens to the cards json array
  state = {
   football,
    clickedTurtleIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  //shuffle the kitten cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedFootballIds = this.state.clickedFootballIds;

    if(clickedFootballIds.includes(id)){
      this.setState({ clickedFootballIds: [], score: 0, status:  "Game Over! You lose. Click to play again!" });
      return;
    }else{
      clickedFootballIds.push(id)

      if(clickedFootballIds.length === 8){
        this.setState({score: 8, status: "You Won! Click to play again!", clickedFootballIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ football, clickedFootballIds, score: clickedFootballIds.length, status: " " });

      for (let i = football.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
         [football[i], football[j]] =  [football[j], football[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.football.map(football => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={football.id}
              key={football.id}
              image={football.image}
            />
          ))}
        </Wrapper>
    </div>
    );
  }
}

export default App;
