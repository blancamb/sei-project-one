function init() {
  //? ELEMENTS 

  //* DOM Elements
  // ---> UserCode DOM Elements
  const userCode = document.querySelector('.user-code')
  const cellsUserCode = []

  // ---> UserCode DOM Elements
  const theCode = document.querySelector('.the-code')
  const cellsCode = []

  // ---> GameBoard DOM Elements
  const gameBoard = document.querySelector('.game-board')
  const cellsGameBoard = []
  const rowsGameBoard = []

  // ---> ResultBox DOM Elements
  const cellsResultBox = []

  // ---> array with last cell of every line
  const cellsForResultBox = []

  // ---> Submit code
  const submitCodeBtn = document.querySelector('.submit-code')


  //* Grid Vars
  // ---> UserCode Grid
  const widthUserCode = 4
  const cellCountUserCode = widthUserCode

  // ---> UserCode Grid
  const widthCode = 4
  const cellCountCode = widthCode

  // ---> GameBoard Grid
  const widthGameBoard = 5
  const cellCountGameBoard = widthGameBoard
  const widthGameBoardResult = 2
  const cellCountGameBoardResult = widthGameBoardResult * 2

  //---> gameBoard rows

  //* Code Vars
  // ---> array for Random code
  const arrayOfCodeParts = ['code-part-a', 'code-part-b', 'code-part-c', 'code-part-d']
  const randomCode = arrayOfCodeParts // ---> array of classes of Random code





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
    // ---> create the Code
    for (let i = 0; i < cellCountCode; i++) {
      const cellC = document.createElement('div')
      cellC.textContent = 'C' + i
      theCode.appendChild(cellC)
      cellsCode.push(cellC)
    }
    // ---> creates gameBoard grid
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div')
      gameBoard.appendChild(row)
      rowsGameBoard.push(row)
      row.classList.add('row')
      row.id = 'row' + i
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
    handleRandomCode()
  }

  // ---> generates a random code 
  function handleRandomCode() {
    let currentIndex = arrayOfCodeParts.length
    let temporaryValue
    let randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = arrayOfCodeParts[currentIndex]
      arrayOfCodeParts[currentIndex] = arrayOfCodeParts[randomIndex]
      arrayOfCodeParts[randomIndex] = temporaryValue
    }
    cellsCode[0].classList.add(arrayOfCodeParts[0])
    cellsCode[1].classList.add(arrayOfCodeParts[1])
    cellsCode[2].classList.add(arrayOfCodeParts[2])
    cellsCode[3].classList.add(arrayOfCodeParts[3])
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

  createUserCodeGrid()
  paintUserCodeGrid()




  //? EVENTS

  document.addEventListener('keyup', handleKeyUp)
  submitCodeBtn.addEventListener('click', handleSubmitCode)


}
window.addEventListener('DOMContentLoaded', init)