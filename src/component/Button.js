import React from "react";

const Button = (props) => {
	let checkBtn;
	switch(props.answerIsCorrect) {
		case true:
			checkBtn = 
			<button className="btn btn-success" 
					disabled={props.selectedNumbers.length === 0}
				onClick={() => props.acceptAnswer()} >
				<i className="fa fa-check" />
			</button>;
			break;
		case false:
			checkBtn = 
			<button className="btn btn-danger" disabled={props.selectedNumbers.length === 0}>
				<i className="fa fa-times" />
				</button>;
			break;
		default:
			checkBtn = <button className="btn" 
								onClick={() => props.checkAnswer()}
								disabled={props.selectedNumbers.length === 0}>=</button>;
	}
	return (
		<div className="col-2 text-center">
			{checkBtn}
			<br /><br />
			<button className="btn btn-warning btn-sm" 
				onClick={props.redraw}
				disabled={props.pendingRedraws === 0} >
					<i className="fa fa-reply" />
					&nbsp;({props.pendingRedraws})
			</button>
		</div>
	);
};
export default Button;