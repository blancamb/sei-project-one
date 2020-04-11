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

  // ---> Submit code
  const submitCodeBtn = document.querySelector('.submit-code')
  console.log(submitCodeBtn)


  const playerAttemptArray = []




  //* Grid Vars
  // ---> UserCode Grid
  const widthUserCode = 4
  const cellCountUserCode = widthUserCode

  // ---> GameBoard Grid
  const widthGameBoard = 5
  const cellCountGameBoard = widthGameBoard * 10
  const widthGameBoardResult = 2
  const cellCountGameBoardResult = widthGameBoardResult * 2

  //---> gameBoard rows



  //? EXECUTION 

  // ---> creates ALL GRIDS
  function createUserCodeGrid() {
    // --->  creates userCode grid
    for (let i = 0; i < cellCountUserCode; i++) {
      const cellUC = document.createElement('div')
      cellUC.textContent = 'U' + i
      userCode.appendChild(cellUC)
      cellsUserCode.push(cellUC)
    }
    // ---> creates gameBoard grid
    for (let i = 0; i < cellCountGameBoard; i++) {
      const cellGB = document.createElement('div')
      cellGB.textContent = 'G' + i
      gameBoard.appendChild(cellGB)
      cellsGameBoard.push(cellGB)
      cellGB.dataset.cellNum = i + 1
      cellGB.classList.add('game-board-empty')
    }
    // ---> gets last div of every line
    cellsGameBoard.filter((cellGB) => {
      if (cellGB.dataset.cellNum % 5 === 0) {
        cellsForResultBox.push(cellGB)
        cellGB.classList.remove('game-board-empty')
        cellGB.classList.add('results')
        cellGB.textContent = ''
      }
    })
    // --> creates a grid inside last div of every line
    cellsForResultBox.forEach((cell) => {
      for (let i = 0; i < cellCountGameBoardResult; i++) {
        const cellR = document.createElement('div')
        cellR.textContent = 'R' + i
        cell.appendChild(cellR)
        cellsResultBox.push(cellR)
      }
    })
    cellsUserCode[0].classList.add('code-part-selected')
  }


  // ---> playerCode changer 
  function handleKeyUp(event) {
    if (cellsUserCode[0].classList.contains('code-part-selected')) {
      if (event.keyCode === 38) {
        if (cellsUserCode[0].classList.contains('code-part-a')) {
          cellsUserCode[0].classList.remove('code-part-a')
          cellsUserCode[0].classList.add('code-part-d')
        } else if (cellsUserCode[0].classList.contains('code-part-d')) {
          cellsUserCode[0].classList.remove('code-part-d')
          cellsUserCode[0].classList.add('code-part-c')
        } else if (cellsUserCode[0].classList.contains('code-part-c')) {
          cellsUserCode[0].classList.remove('code-part-c')
          cellsUserCode[0].classList.add('code-part-b')
        } else if (cellsUserCode[0].classList.contains('code-part-b')) {
          cellsUserCode[0].classList.remove('code-part-b')
          cellsUserCode[0].classList.add('code-part-a')
        }
      } else if (event.keyCode === 40) {
        if (cellsUserCode[0].classList.contains('code-part-a')) {
          cellsUserCode[0].classList.remove('code-part-a')
          cellsUserCode[0].classList.add('code-part-b')
        } else if (cellsUserCode[0].classList.contains('code-part-b')) {
          cellsUserCode[0].classList.remove('code-part-b')
          cellsUserCode[0].classList.add('code-part-c')
        } else if (cellsUserCode[0].classList.contains('code-part-c')) {
          cellsUserCode[0].classList.remove('code-part-c')
          cellsUserCode[0].classList.add('code-part-d')
        } else if (cellsUserCode[0].classList.contains('code-part-d')) {
          cellsUserCode[0].classList.remove('code-part-d')
          cellsUserCode[0].classList.add('code-part-a')
        }
      
      } else {
        console.log('not this')
      }

    }
  }

  // ---> paints userCode with code (TESTING)
  function paintUserCodeGrid() {
    cellsUserCode[0].classList.add('code-part-a')
    cellsUserCode[1].classList.add('code-part-b')
    cellsUserCode[2].classList.add('code-part-c')
    cellsUserCode[3].classList.add('code-part-d')
  }

  function handleSubmitCode() {
    cellsUserCode.forEach(cell => {
      cell.classList.remove('code-part-selected')
    })
    if (cellsGameBoard[45].classList.contains('game-board-empty')) {
      cellsGameBoard[45].classList.remove('game-board-empty')
      cellsGameBoard[45].classList.add(cellsUserCode[0].className)
      cellsGameBoard[46].classList.remove('game-board-empty')
      cellsGameBoard[46].classList.add(cellsUserCode[1].className)
      cellsGameBoard[47].classList.remove('game-board-empty')
      cellsGameBoard[47].classList.add(cellsUserCode[2].className)
      cellsGameBoard[48].classList.remove('game-board-empty')
      cellsGameBoard[48].classList.add(cellsUserCode[3].className)
    } else if (cellsGameBoard[40].classList.contains('game-board-empty')) {
      cellsGameBoard[40].classList.remove('game-board-empty')
      cellsGameBoard[40].classList.add(cellsUserCode[0].className)
      cellsGameBoard[41].classList.remove('game-board-empty')
      cellsGameBoard[41].classList.add(cellsUserCode[1].className)
      cellsGameBoard[42].classList.remove('game-board-empty')
      cellsGameBoard[42].classList.add(cellsUserCode[2].className)
      cellsGameBoard[43].classList.remove('game-board-empty')
      cellsGameBoard[43].classList.add(cellsUserCode[3].className)
    }
  }
  console.log(playerAttemptArray)

  // --->  Creates userCode and gameBoard grids

  createUserCodeGrid()
  paintUserCodeGrid()

  


  //? EVENTS

  document.addEventListener('keyup', handleKeyUp)
  submitCodeBtn.addEventListener('click', handleSubmitCode)


}
window.addEventListener('DOMContentLoaded', init)