import React from "react";
import Game from "./Game";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Game />
      </div>
    )
  }
}
export default App;