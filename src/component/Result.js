import React from "react";

const Result = (props) => {	
	return (
		<div className="text-center">
			<h2>
				{props.doneStatus}
				<br />
				<button className="btn btn-secondary" onClick={props.restartGame}>
					Play Again
				</button>
			</h2>
		</div>
	)
};
export default Result;