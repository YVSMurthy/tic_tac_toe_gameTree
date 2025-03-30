# Tic-Tac-Toe Engine with Alpha-Beta Pruning

A dynamic and interactive Tic-Tac-Toe game built with JavaScript, HTML5 Canvas, and CSS. The game supports various grid sizes (3x3, 4x4, 5x5) and features a challenging AI opponent powered by the Minimax algorithm with Alpha-Beta Pruning.

<div align='center' style="marginTop: 10;">
    <img src="https://github.com/user-attachments/assets/22c6038b-f05e-4a57-b621-93cecd0827f7" alt="Main Screen" width="400"/>
</div>


## Features

- **Dynamic Grid Sizes:** Switch between 3x3, 4x4, and 5x5 boards with ease
- **Interactive Gameplay:** Play as "X" while the computer plays as "O"
- **Smart AI Opponent:** The AI uses Alpha-Beta Pruning to determine the best moves up to a depth of 2
- **Game States:** Detects winner, draw, and game over conditions dynamically

<div align='center' style="marginTop: 10;">
    <img src="https://github.com/user-attachments/assets/1a54f11b-6912-4618-9ff0-d809db3e3695" alt="Main Screen" width="400"/>
</div>

## Table of Contents

- [How It Works](#how-it-works)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## How It Works

### Grid Creation
A Grid instance calculates the coordinates for the grid lines. The grid is drawn dynamically on the canvas.

### Board Management
The Board class manages the game state and validates winning conditions.

### Gameplay
Players make moves by clicking on the canvas. The AI opponent calculates the best move using a GameTreeClassifier with Alpha-Beta Pruning.

### Winner Detection
The game checks for a winner after every move (row, column, or diagonal match).

### Game Modes
Choose between 3x3, 4x4, and 5x5 grids using intuitive buttons.

## Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning the repository)

### Clone the Repository
```bash
git clone https://github.com/YVSMurthy/tic_tac_toe_gameTree.git
cd tic-tac-toe-engine
```

## Setup

This project is built with vanilla JavaScript, HTML, and CSS. No build tools or package managers are required.

1. Open the project folder
2. Open `index.html` in your browser

## Usage

1. Open the game in your browser
2. Select a grid size (3x3, 4x4, or 5x5)
3. Click on a cell to place your "X" marker
4. The AI will automatically respond with an "O" marker
5. Continue until a winner is determined or the game ends in a draw
6. Use the "New Game" button to start over

## Technologies Used

- **HTML5 Canvas:** For rendering the game board
- **JavaScript (ES6+):** For game logic and AI implementation
- **CSS3:** For styling and responsive design
- **Minimax Algorithm:** For AI decision-making
- **Alpha-Beta Pruning:** For optimizing AI performance
