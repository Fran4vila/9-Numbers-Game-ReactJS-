import React from "react";

const Stars = (props) => {
	//let stars = [];
	//for (let i=0; i<numberOfStars; i++) {
	//	stars.push(<i className="fa fa-star"></i>);
	//}

	return (
		<div className="col-5">
		{_.range(props.numberOfStars).map(i => 
			<i key={i} className="fa fa-star"></i>
		)}
		</div>
	)
};
export default Stars;