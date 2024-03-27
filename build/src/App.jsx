/* 
Developed by NotNotTy
Teaching purposes
*/


import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import greenTarget from './assets/green.png'
import redTarget from './assets/red.png'
import logo from './assets/logo.png'
import './target.css'
import './App.css'

/*
THINGS YOU HAVE TO KNOW:
HTML structure
basic JavaScript and its syntax
Read the basic tutorial

*/

/*
Functions for the start and play again button
*/
function StartButton({value, hoverValue, dishoverValue, clickValue}){ 
return (
  <button className='startButton' 
  onMouseEnter={hoverValue}
   onMouseLeave={dishoverValue}
   onClick={clickValue}>{value}</button>
);
}

function PlayAgainButton({value, hoverValue, dishoverValue, clickValue}){
  return (
    <button className='playAgainButton' 
    onMouseEnter={hoverValue}
    onMouseLeave={dishoverValue}
    onClick={clickValue}>{value}</button>
    )
}




//the main function, will be used to load and re-render the webpage
function App() { 
  /* Permenant variables, need to save their memory */

  /* 
  useState is a nice little function provided by React.
  It keeps value permenant, which is important because
  the function "App" is constantly being called to load
  the webpage. the useState function returns a value and a method to update said value.
  These functions provided by React are called "hooks"

  */
  const [startValue, updateStartValue] = useState("Press to begin"); 
  const[playAgainValue, updatePlayAgainValue] = useState("Play Again?")
  const[gameStart, updateGameStart] = useState(false); 
  const[tooEarly, updateTooEarly] = useState(false);
  const[onTime, updateOnTime] = useState(false);
  const [isClicked, updateClick] = useState(false);
  const [reactionTime, updateReactionTime] = useState(0);


 /*
  These variables do not retain their memory, and are only used for simple brief calculations which
  are then stored in the variables above.
 */
  var isGreen = false;
  var greenlitTime = 0;
  var activeTime = 0;


  /*
  logic function for the reaction circle. Basically, it chooses a random amount of seconds before turning green
  */
  function ClickReactionCircle({clickValue}){ 
    const [image, setImg] = useState(redTarget);
    const [classID, setClassName] = useState("redTarget");
    const [aboveMessage, updateAboveMessage] = useState("wait for it...");
    const timeoutTime = Math.random() * 10 * 1000; //between 1-10 seconds of waiting
  
    
  
    /* 
    useEffect is another hook provided by React. 
    This helps us synchronize a function with an external system.

    useEffect has 3 parts: the setup function that connects to the external system, a cleanup function
    once the system is disconnected, and a list of dependencies used in the setup function

    Take the following effect, where im calling on setTimeout(), a method provided by JavaScript,
    to set a timeout feature. setTimeout() is an external system.
     In my parameters of "setTimeout()", I have all the things I want to be
    done once the timeout is reached. After the comma, that is the timeout time.
    the cleanup function is towards the bottom, stated by the return following the arrow notation
    Since I dont use any dependencies in my setup, my list of dependencies is empty at the bottom

    more help: https://react.dev/reference/react/useEffect
    
    */
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setImg(greenTarget)
        setClassName("greenTarget")
        updateAboveMessage("Now!")
        isGreen = true;
        greenlitTime = Date.now();
      }, timeoutTime);
  
      // Cleanup function to clear the timeout if the component unmounts
      
      return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array ensures the effect runs only once
  
  
  
  return (
    <>
      <div><p>{aboveMessage}</p></div>
      <img src = {image} className={classID} onClick={clickValue} />
    </>
  )
  }

  /*
  The following functions are interactive functions that I've assigned to a certain action.
  For example, if the mouse hovers over the start button, then the "handleStartHover()" is called
  */
  function handleStartHover(){ 
    updateStartValue("Begin?");
  }

  function handleStartDishover(){
    updateStartValue("Press to begin")
  }

  function handleStartClick(){
    updateGameStart(true);
  }

  //play agin button functions
  function handlePlayAgainHover(){
    updatePlayAgainValue("Yes!")
  }

  function handlePlayAgainDishover(){
    updatePlayAgainValue("Play Again?")
  }

  function handlePlayAgainClick(){
    updateGameStart(false);
    updateReactionTime(0);
    updateTooEarly(false);
    updateOnTime(false);
    updatePlayAgainValue("Play Again?");
    updateStartValue("Press to begin");

  }


  function handleCircleClick(){
    updateClick(true);
    activeTime = Date.now()
    
    if (!isGreen){
      updateTooEarly(true);
    }
    else {
      updateOnTime(true);
      updateReactionTime(activeTime - greenlitTime);
    }

    

  }


  /*
  The following code now sets up my webpage
  */
  if (!gameStart){ //if it hasnt started, so if this variable is false
  return (
    <>
    <img src= {logo} className="logo"/>
    <h1> Reaction Time</h1>
    <h3>How fast can you go?</h3>
    <StartButton value ={startValue} hoverValue ={() => handleStartHover()} dishoverValue={() => handleStartDishover()} clickValue={() => handleStartClick()} />
    </>
  );
  }
  else if (gameStart && !tooEarly && !onTime){ //if it has started and nothing else
  return (
    <>
    <ClickReactionCircle clickValue = {() => handleCircleClick()} />

    </>
  )
}

else if (tooEarly){ //if pressed too early
  return (
    <>
    <h2>Too Early!</h2>
    <PlayAgainButton
    value = {playAgainValue}
    hoverValue={() => handlePlayAgainHover()}
    dishoverValue={() => handlePlayAgainDishover()}
    clickValue = {() => handlePlayAgainClick()} />

    </>
  )
}

if (onTime){ //if pressed on
  return (
    <>
    <h2> on Time!</h2>
    <p> Reaction Time: <b>{reactionTime} </b> milliseconds </p>
    <PlayAgainButton
    value = {playAgainValue}
    hoverValue={() => handlePlayAgainHover()}
    dishoverValue={() => handlePlayAgainDishover()}
    clickValue = {() => handlePlayAgainClick()} />
    
    </>
  )
}

  else {
    return null;
  }
}

/* Lastly, this line re-renders/re calls the App function*/
export default App

/* code that came with creating the project
   <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
*/


