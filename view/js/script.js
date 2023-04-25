const tiles = Array.from(document.querySelectorAll(".box"));
const resetButton = document.querySelector("#reset");
const calculateButton = document.querySelector("#calculate");
const historyButton = document.querySelector("#history_button");
const resultShow = document.querySelector(".result_span");
const messageHolder = document.querySelector(".alert");
const idHolder = document.querySelector(".id_holder");
//Empty initial board
let board = [
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
];
//User asction depends on click
function userAction(tile, index) {
  if (tile.innerText == "X") {
    tile.innerText = "O";
    tile.classList.remove("open");
    board[index] = "O";
  } else {
    tile.innerText = "X";
    tile.classList.add("open");
    board[index] = "X";
  }
}
//Assign click event every tile
tiles.forEach((tile, index) => {
  tile.innerText = "O";
  tile.addEventListener("click", () => userAction(tile, index));
});
//To reset
function resetBoard() {
  resultShow.innerText = "";
  idHolder.innerText = "";
  tiles.forEach((tile) => {
    tile.innerText = "O";
    tile.classList.remove("open");
  });
}

const calculate = (board) => {
  let newBoard = [];
  //To turn x->0 and o-1
  board.forEach((boardItem) => {
    if (boardItem == "X") {
      newBoard.push(1);
    } else {
      newBoard.push(0);
    }
  });
  //Turn 1d array into 2d array
  const newArr = [];
  while (newBoard.length) {
    newArr.push(newBoard.splice(0, 5));
  }
  //Calculation result
  let result = findPerimeter(newArr);
  resultShow.innerText = result;
  return { island_sum: result, island_arr: newArr };
};

const findPerimeter = (island) => {
  // base case
  if (island.length == 0) {
    return 0;
  }

  M = island.length;
  N = island[0].length;

  count = 0;

  // traverse each cell of the matrix
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      // if the current cell is a land
      if (island[i][j] == 1) {
        // check if top edge is adjacent to the water
        if (i == 0 || island[i - 1][j] == 0) {
          count++;
        }

        // check if bottom edge is adjacent to the water
        if (i == M - 1 || island[i + 1][j] == 0) {
          count++;
        }

        // check if left edge is adjacent to the water
        if (j == 0 || island[i][j - 1] == 0) {
          count++;
        }

        // check if right edge is adjacent to the water
        if (j == N - 1 || island[i][j + 1] == 0) {
          count++;
        }
      }
    }
  }
  return count;
};

const setPreviousIslandArr = (result) => {
  window.scrollTo(0, 0);
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (result[i][j] == 1) {
        tiles[i * result.length + j].classList.add("open");
      } else {
        tiles[i * result.length + j].classList.remove("open");
      }
      tiles[i * result.length + j].innerText = result[i][j] == 1 ? "X" : "O";
    }
  }
  //To set previous array as an initial array
  board = [];
  tiles.forEach((tile) => {
    board.push(tile.innerText);
  });
};
const showAlert = (message) => {
  messageHolder.innerText = message;
  messageHolder.classList.add("show");
  window.scrollTo(0, 0);
  setTimeout(() => {
    messageHolder.classList.remove("show");
  }, 1500);
};
resetButton.addEventListener("click", resetBoard);
calculateButton.addEventListener("click", () => {
  const data = calculate(board);
  const xhr = new XMLHttpRequest();

  //set the PHP page you want to send data to
  xhr.open("POST", "main.php");
  xhr.setRequestHeader("Content-Type", "application/json");

  // what to do when you receive a response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const response = JSON.parse(xhr.response);
      if (!response.error) {
        showAlert(response.message);
        idHolder.innerText = response.data.id;
      }
    }
  };

  // send the data
  xhr.send(JSON.stringify(data));
});
historyButton.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  const data = idHolder.innerText ? idHolder.innerText : "-100";
  //set the PHP page you want to send data to
  xhr.open("POST", "main.php");
  xhr.setRequestHeader("Content-Type", "application/json");

  // what to do when you receive a response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const response = JSON.parse(xhr.response);
      if (response.error) {
        showAlert(response.error);
        idHolder.innerText = "";
        resultShow.innerText = "";
      } else {
        idHolder.innerText = response.data.id;

        setPreviousIslandArr(JSON.parse(response.data.island_arr));
        resultShow.innerText = JSON.parse(response.data.island_sum);
      }
    }
  };

  // send the data

  xhr.send(JSON.stringify({ id: Number(data) }));
});
