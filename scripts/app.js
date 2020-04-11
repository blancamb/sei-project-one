function init() {
  //? ELEMENTS 

  //* DOM Elements
  // ---> UserCode DOM Elements
  const userCode = document.querySelector('.user-code')
  const cellsUserCode = []

  // ---> GameBoard DOM Elements
  const gameBoard = document.querySelector('.game-board')
  const cellsGameBoard = []

  // ---> ResultBox DOM Elements
  const cellsResultBox = []

  // ---> array with last cell of every line
  const cellsForResultBox = []





  //* Grid Vars
  // ---> UserCode Grid
  const widthUserCode = 4
  const cellCountUserCode = widthUserCode

  // ---> GameBoard Grid
  const widthGameBoard = 5
  const cellCountGameBoard = widthGameBoard * 10

  const widthGameBoardResult = 2
  const cellCountGameBoardResult = widthGameBoardResult * 2


  //? EXECUTION 

  // --->  creates userCode grid
  function createUserCodeGrid() {
    for (let i = 0; i < cellCountUserCode; i++) {
      const cellUC = document.createElement('div')
      cellUC.textContent = 'U' + i
      userCode.appendChild(cellUC)
      cellsUserCode.push(cellUC)
    }
  }

  // ---> creates gameBoard grid
  function createGameBoardGrid() {
    for (let i = 0; i < cellCountGameBoard; i++) {
      const cellGB = document.createElement('div')
      cellGB.textContent = 'G' + i
      gameBoard.appendChild(cellGB)
      cellsGameBoard.push(cellGB)
      cellGB.dataset.cellNum = i + 1
    }
    // ---> gets last div of every line

    cellsGameBoard.filter((cellGB) => {
      if (cellGB.dataset.cellNum % 5 === 0) {
        cellsForResultBox.push(cellGB)
        cellGB.classList.add('results')
        cellGB.textContent = ''
      }
    })
    createResultBox()
  }

  // --> creates a grid inside last div of every line
  function createResultBox() {

    cellsForResultBox.forEach((cell) => {
      for (let i = 0; i < cellCountGameBoardResult; i++) {
        const cellR = document.createElement('div')
        cellR.textContent = 'R' + i
        cell.appendChild(cellR)
        cellsResultBox.push(cellR)
      }
    })
  }

  console.log(cellsForResultBox)
  console.log(cellsResultBox)



  // ---> paints userCode with code (TESTING)
  function paintUserCodeGrid() {
    cellsUserCode[0].classList.add('code-part-a')
    cellsUserCode[1].classList.add('code-part-b')
    cellsUserCode[2].classList.add('code-part-c')
    cellsUserCode[3].classList.add('code-part-d')
  }

  // ---> copies userCode to gameBoard last row
  function submitCode() {
    cellsGameBoard[45].classList.add(cellsUserCode[0].className)
    cellsGameBoard[46].classList.add(cellsUserCode[1].className)
    cellsGameBoard[47].classList.add(cellsUserCode[2].className)
    cellsGameBoard[48].classList.add(cellsUserCode[3].className)
  }

  // --->  Creates userCode and gameBoard grids

  createUserCodeGrid()
  createGameBoardGrid()
  paintUserCodeGrid()
  submitCode()
  //? EVENTS


}
window.addEventListener('DOMContentLoaded', init)