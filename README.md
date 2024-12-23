<h1>Tic-Tac-Toe Engine with Alpha Beta Pruning</h1>

<p>A dynamic and interactive Tic-Tac-Toe game built with JavaScript, HTML5 Canvas, and CSS. The game supports various grid sizes (3x3, 4x4, 5x5) 
  and features a challenging AI opponent powered by the Minimax algorithm with Alpha-Beta Pruning.</p>
  
<br/>

<img width="500" alt="image" src="https://github.com/user-attachments/assets/22c6038b-f05e-4a57-b621-93cecd0827f7" />

<br/>

<h2>Features</h2>
<ul>
  <li><b>Dynamic Grid Sizes:</b> Switch between 3x3, 4x4, and 5x5 boards with ease.</li>
  <li><b>Interactive Gameplay:</b> Play as "X" while the computer plays as "O".</li>
  <li><b>Smart AI Opponent:</b> The AI uses Alpha-Beta Pruning to determine the best moves up to a depth of 2.</li>
  <li><b>Game States:</b> Detects winner, draw, and game over conditions dynamically.</li>
</ul>

<br/>

<img width="500" alt="image" src="https://github.com/user-attachments/assets/1a54f11b-6912-4618-9ff0-d809db3e3695" />

<br/>

<h2>How It Works</h2>
<b>Grid Creation:</b> <br/>
A Grid instance calculates the coordinates for the grid lines. The grid is drawn dynamically on the canvas.
<br/> <br/>
<b>Board Management:</b> <br/>
The Board class manages the game state and validates winning conditions. 
<br/> <br/>
<b>Gameplay:</b> <br/>
Players make moves by clicking on the canvas.
The AI opponent calculates the best move using a GameTreeClassifier with Alpha-Beta Pruning. 
<br/> <br/>
<b>Winner Detection:</b> <br/>
The game checks for a winner after every move (row, column, or diagonal match). 
<br/> <br/>
<b>Game Modes:</b> <br/>
Choose between 3x3, 4x4, and 5x5 grids using intuitive buttons.
