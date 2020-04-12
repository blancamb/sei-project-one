function init() {
  //? ELEMENTS 

  //* DOM Elements
  // ---> UserCode DOM Elements
  const userCode = document.querySelector('.user-code')

  // ---> UserCode DOM Elements
  const theCode = document.querySelector('.the-code')

  // ---> GameBoard DOM Elements
  const gameBoard = document.querySelector('.game-board')

  // ---> Submit code
  const submitCodeBtn = document.querySelector('.submit-code')


  //* Grid Vars
  // ---> UserCode Grid
  const cellsCode = []
  const widthUserCode = 4
  const cellCountUserCode = widthUserCode

  // ---> UserCode Grid
  const cellsUserCode = []
  const widthCode = 4
  const cellCountCode = widthCode

  // ---> GameBoard Grid
  const rowsGameBoard = []
  const cellsGameBoard = []
  const cellsResultBox = []
  const cellsForResultBox = []  // ---> array with last cell of every line
  const widthGameBoard = 5
  const cellCountGameBoard = widthGameBoard
  const widthGameBoardResult = 2
  const cellCountGameBoardResult = widthGameBoardResult * 2

  //---> gameBoard rows

  //* Code Vars
  // ---> array for Random code
  const arrayOfCodeParts = ['code-part-a', 'code-part-b', 'code-part-c', 'code-part-d']
  const randomCode = arrayOfCodeParts // ---> array of classes of Random code

  let playerCodePosition = 0


  //? EXECUTION 

  // ---> creates ALL GRIDS
  function createUserCodeGrid(startingPosition) {
    // --->  creates userCode grid
    for (let i = 0; i < cellCountUserCode; i++) {
      const cellUC = document.createElement('div')
      cellUC.textContent = 'U' + i
      userCode.appendChild(cellUC)
      cellsUserCode.push(cellUC)
      cellsUserCode[startingPosition].classList.add('code-part-selected')
    }
    // ---> create the Code
    for (let i = 0; i < cellCountCode; i++) {
      const cellC = document.createElement('div')
      cellC.textContent = 'C' + i
      theCode.appendChild(cellC)
      cellsCode.push(cellC)
    }
    // ---> creates gameBoard grid: 10 rows
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div')
      gameBoard.appendChild(row)
      rowsGameBoard.push(row)
      row.classList.add('row')
      row.id = 'row' + (10 - i)
      for (let i = 0; i < cellCountGameBoard; i++) {
        const cellGB = document.createElement('div')
        cellGB.textContent = 'G' + i
        row.appendChild(cellGB)
        cellsGameBoard.push(cellGB)
        cellGB.dataset.cellNum = i + 1
        cellGB.classList.add('game-board-empty')
      }
    }
    // ---> gets last div of every line
    cellsGameBoard.filter((cellGB) => {
      if (cellGB.dataset.cellNum === '5') {
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
        cellR.textContent = i
        cell.appendChild(cellR)
        cellsResultBox.push(cellR)
      }
    })
    handleRandomCode(arrayOfCodeParts)
  }

  // ---> generates a random code 
  function handleRandomCode(array) {
    let currentIndex = array.length
    let temporaryValue
    let randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    for (let i = 0; i < cellsCode.length; i++) {
      cellsCode[i].classList.add(array[i])
    }
  }

  // ---> playerCode changer 
  function handleKeyUp(event) {
    const x = playerCodePosition % widthUserCode
    if (event.keyCode === 38) {
      if (cellsUserCode[playerCodePosition].classList.contains('code-part-a')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-a')
        cellsUserCode[playerCodePosition].classList.add('code-part-d')
      } else if (cellsUserCode[playerCodePosition].classList.contains('code-part-d')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-d')
        cellsUserCode[playerCodePosition].classList.add('code-part-c')
      } else if (cellsUserCode[playerCodePosition].classList.contains('code-part-c')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-c')
        cellsUserCode[playerCodePosition].classList.add('code-part-b')
      } else if (cellsUserCode[playerCodePosition].classList.contains('code-part-b')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-b')
        cellsUserCode[playerCodePosition].classList.add('code-part-a')
      }
    } else if (event.keyCode === 40) {
      if (cellsUserCode[playerCodePosition].classList.contains('code-part-a')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-a')
        cellsUserCode[playerCodePosition].classList.add('code-part-b')
      } else if (cellsUserCode[playerCodePosition].classList.contains('code-part-b')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-b')
        cellsUserCode[playerCodePosition].classList.add('code-part-c')
      } else if (cellsUserCode[playerCodePosition].classList.contains('code-part-c')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-c')
        cellsUserCode[playerCodePosition].classList.add('code-part-d')
      } else if (cellsUserCode[playerCodePosition].classList.contains('code-part-d')) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-d')
        cellsUserCode[playerCodePosition].classList.add('code-part-a')
      }
    } else if (event.keyCode === 39) {
      if (x < widthUserCode - 1) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-selected')
        playerCodePosition++
        cellsUserCode[playerCodePosition].classList.add('code-part-selected')
      }
    } else if (event.keyCode === 37) {
      if (x > 0) {
        cellsUserCode[playerCodePosition].classList.remove('code-part-selected')
        playerCodePosition--
        cellsUserCode[playerCodePosition].classList.add('code-part-selected')
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
    const submittedCode = [] // ---> array of classes of Submitted code
    cellsUserCode.forEach(cell => {
      cell.classList.remove('code-part-selected')
      submittedCode.push(cell.className)
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
    const codeAnswer = []
    for (let i = 0; i < submittedCode.length; i++) {
      if (submittedCode[i] === randomCode[i]) {
        codeAnswer.push('code-right')
      } else if (submittedCode[i] !== randomCode[i]) {
        codeAnswer.push('code-wrong')
      }
    }

  }

  // --->  Creates userCode and gameBoard grids

  createUserCodeGrid(playerCodePosition)
  paintUserCodeGrid()




  //? EVENTS

  document.addEventListener('keyup', handleKeyUp)
  submitCodeBtn.addEventListener('click', handleSubmitCode)


}
window.addEventListener('DOMContentLoaded', init)