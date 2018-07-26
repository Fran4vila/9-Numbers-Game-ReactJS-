import React from "react";
import Button from "./Button"
import Numbers from "./Numbers"
import Stars from "./Stars"
import Answer from "./Answer"
import Result from "./Result"

var possibleCombinationSum = function(arr, n) {
	if (arr.indexOf(n) >= 0) { return true; }
	if (arr[0] > n) { return false; }
	if (arr[arr.length - 1] > n) {
		arr.pop();
		return possibleCombinationSum(arr, n);
	}
	var listSize = arr.length, combinationsCount = (1 << listSize)
	for (var i = 1; i < combinationsCount ; i++ ) {
		var combinationSum = 0;
		for (var j=0 ; j < listSize ; j++) {
			if (i & (1 << j)) { combinationSum += arr[j]; }
		}
		if (n === combinationSum) { return true; }
	}
	return false;
};

class Game extends React.Component {
	static randomNumber = () => 1 + Math.floor(Math.random() * 9);
	static initialState = () => ({
		selectedNumbers: [],    
		randomNumberOfStars: Game.randomNumber(),
		usedNumbers: [],
		answerIsCorrect: null,
		pendingRedraws: 5,
		doneStatus: null
	});
	state = Game.initialState();
	
	restartGame = () => this.setState(Game.initialState());
	
	selectNumber = (clickedNumber) => {
		if (this.state.selectedNumbers.indexOf(clickedNumber) >=0 || this.state.usedNumbers.indexOf(clickedNumber) >=0 ) { return; }
		this.setState(prevState => ({
			selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
			answerIsCorrect: null
		}))
	};
	
	unselectnumber = (clickedNumber) => {
		this.setState(prevState => ({
			answerIsCorrect: null,
			selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
		}))
	};
	
	checkAnswer = () => {
		this.setState(prevState => ({
			answerIsCorrect: prevState.randomNumberOfStars === 
			prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
		}));
	};
	
	acceptAnswer = () => {
		this.setState(prevState => ({
			usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
			selectedNumbers: [],
			answerIsCorrect: null,
			randomNumberOfStars: Game.randomNumber()
		}), this.updateDoneStatus);
	};
  
	redraw = () => {
		if (this.state.pendingRedraws === 0) { return; }
		this.setState(prevState => ({
			selectedNumbers: [],
			answerIsCorrect: null,
			randomNumberOfStars: Game.randomNumber(),
			pendingRedraws: prevState.pendingRedraws - 1
		}), this.updateDoneStatus);
	};
	
	updateDoneStatus = () => {
		this.setState(prevState => {
			if (prevState.usedNumbers.length === 9) {
				return { doneStatus: 'You Win!' };
			}
			if (prevState.pendingRedraws === 0 && !this.possibleSolutions(prevState)) {
				return { doneStatus: 'Game Over!' };
			}
		})
	};
	
	possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
		const possibleNumbers = _.range(1, 10).filter(number =>
			usedNumbers.indexOf(number) === -1
		);    
		return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
	};
  
	render() {
		const { 
			selectedNumbers, 
			randomNumberOfStars, 
			answerIsCorrect, 
			usedNumbers,
			pendingRedraws,
			doneStatus
		} = this.state;
    
		return (
			<div>
				<h3>Play Nine</h3>
				<div className="row">
					<Stars numberOfStars={randomNumberOfStars} />
					<Button selectedNumbers={selectedNumbers} 
							checkAnswer={this.checkAnswer}
							answerIsCorrect={answerIsCorrect} 
							acceptAnswer={this.acceptAnswer}
							redraw={this.redraw}
							pendingRedraws={pendingRedraws} />
					<Answer selectedNumbers={selectedNumbers} 
							unselectnumber={this.unselectnumber}/>
				</div>
				<br />
				{doneStatus ? 
					<Result doneStatus={doneStatus}
							restartGame={this.restartGame} /> :
					<Numbers selectedNumbers={selectedNumbers} 
							selectNumber={this.selectNumber} 
							usedNumbers={usedNumbers} />  
				}        
			</div>
		)
 	}
}
export default Game;