// How the Game would be played.

/* Before a play starts playing, the game grid will be set to null (Which means no-value).
The first player input will be "X" which moves the array to 0, 
while the second player which is the computer input is "O" and it moves the array to move to increment. */


/* First I defined a variable called build which is an object. 
Inside this variable would be all the javascript functions which will perform the player and computer inputs. 
Next I created the build.ticTacToe, inside this array would be the game status.
Our build.ticTacToe will have 9 inputs which will hold each box in the game grid, which will range from "0-8" based on javascript array concept. */

var build = {
  ticTacToe: [], // inside this array would be the game status

  // The reset function would be the one to reset the game.
  reset: function() {
    
  // Inside the reset function is the reset ticTacToe array & innerHTML box
    build.ticTacToe = []; 
    var box = document.getElementById("ticTac");
    box.innerHTML = "";

    // create a loop for the game grid
    for (let i = 0; i < 9; i++) { 
      build.ticTacToe.push(null); 
      var grid = document.createElement("div"); //Creates a new div called grid to hold box space inside the ticTac
      grid.innerHTML = "&nbsp;" //no breaking space
      grid.dataset.idx = i; //attaching a dataset attribute called data-idx which corresponds to the index of the grid
      grid.id = "ticTac" + i; //attaching id which corresponds to the index of the grid
      grid.addEventListener("click", build.play);
      box.appendChild(grid); // we appended our grid variable into our boxes which contains id tictac.
    }
  },
  // For the build.play function, which triggers when the player selects a grid
  play: function() {

    // First Player moves - This player moves represent "X"
    var moves = this.dataset.idx;
    build.ticTacToe[moves] = 0;
    this.innerHTML = "X";
    this.classList.add("player");
    this.removeEventListener("click", build.play);

    // An if statement to show if there's no more moves with the output (no winner)
    if (build.ticTacToe.indexOf(null) == -1) {
      alert("No winner");
      build.reset();
    }

    // The second player which is the computer moves - The computer moves represents "O"
    else {
      moves = build.compMove();
      build.ticTacToe[moves] = 1;
      var grid = document.getElementById("ticTac" + moves);
      grid.innerHTML = "O";
      grid.classList.add("comp");
      grid.removeEventListener("click", build.play);
    }

    //Now let's check for the winner
    win = null;

    // To check for the Horizontal row loops checks
    for (let i = 0; i < 9; i += 3) {
      if (
        build.ticTacToe[i] != null && 
        build.ticTacToe[i + 1] != null && 
        build.ticTacToe[i + 2] != null 
      ) {
        if (
          build.ticTacToe[i] == build.ticTacToe[i + 1] &&
          build.ticTacToe[i + 1] == build.ticTacToe[i + 2]
        ) {
          win = build.ticTacToe[i];
        }
      }
      if (win !== null) {
        break;
      }
    }

    // To check for the Vertical row loops checks
    if (win === null) {
      for (let i = 0; i < 3; i++) {
        if (
          build.ticTacToe[i] != null &&
          build.ticTacToe[i + 3] != null &&
          build.ticTacToe[i + 6] != null
        ) {
          if (
            build.ticTacToe[i] == build.ticTacToe[i + 3] &&
            build.ticTacToe[i + 3] == build.ticTacToe[i + 6]
          ) {
            win = build.ticTacToe[i];
          }
          if (win !== null) {
            break;
          }
        }
      }
    }

    // To check for the two Diagonal row loops checks
    if (win === null) {
      if (
        build.ticTacToe[0] != null &&
        build.ticTacToe[4] != null &&
        build.ticTacToe[8] != null
      ) {
        if (build.ticTacToe[0] == build.ticTacToe[4] && build.ticTacToe[4] == build.ticTacToe[8]) {
          win = build.ticTacToe[4];
        }
      }
    }
    if (win === null) {
      if (
        build.ticTacToe[2] != null &&
        build.ticTacToe[4] != null &&
        build.ticTacToe[6] != null
      ) {
        if (build.ticTacToe[2] == build.ticTacToe[4] && build.ticTacToe[4] == build.ticTacToe[6]) {
          win = build.ticTacToe[4];
        }
      }
    }

    // A Conditional(ternary) if statement to determine the winner
    if (win !== null) {
      alert("WINNER - " + (win == 0 ? "Player" : "Computer"));
      build.reset();
    }
  },

  // Function for the computer moves
  compMove: function() {

    // let's declare a variable called notClick which removes the notClicked slots
    var notClick = [];
    for (let i = 0; i < 9; i++) {
      if (build.ticTacToe[i] === null) {
        notClick.push(i);
      }
    }

    // A javascipt in-Built method to randomly choose any notClicked slot
    var random = Math.floor(Math.random() * (notClick.length - 1));
    return notClick[random];
  }
};


window.addEventListener("load", build.reset);
