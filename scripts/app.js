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

  // ---> Messge-Board
  const messagesBoard = document.querySelector('.message-board')

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
  const widthGameBoard = 5
  const cellCountGameBoard = widthGameBoard
  const widthGameBoardResult = 2
  const cellCountGameBoardResult = widthGameBoardResult * 2
  //---> gameBoard rows
  const rowOne = []
  const rowTwo = []
  const rowThree = []
  const rowFour = []
  const rowFive = []
  const rowSix = []
  const rowSeven = []
  const rowEight = []
  const rowNine = []
  const rowTen = []
  const rows = [rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rowSeven, rowEight, rowNine, rowTen]
  // ---> results cells
  const resultOne = []
  const resultTwo = []
  const resultThree = []
  const resultFour = []
  const resultFive = []
  const resultSix = []
  const resultSeven = []
  const resultEight = []
  const resultNine = []
  const resultTen = []
  const resultsAll = [resultOne, resultTwo, resultThree, resultFour, resultFive, resultSix, resultSeven, resultEight, resultNine, resultTen]

  //* Code Vars
  // ---> array for Random code
  const arrayOfCodeParts = ['code-part-a', 'code-part-b', 'code-part-c', 'code-part-d']
  const codeParts = ['code-part-a', 'code-part-b', 'code-part-c', 'code-part-d']
  const randomCode = arrayOfCodeParts // ---> array of classes of Random code
  let codeAnswer = []
  const randomAnswer = codeAnswer
  let playerCodePosition = 0
  let numberOfSubmits = 0


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
    for (let a = 0; a < cellCountCode; a++) {
      const cellC = document.createElement('div')
      cellC.textContent = 'C' + a
      theCode.appendChild(cellC)
      cellsCode.push(cellC)
    }
    // ---> creates gameBoard grid: 10 rows
    for (let b = 0; b < 10; b++) {
      const row = document.createElement('div')
      gameBoard.appendChild(row)
      rowsGameBoard.push(row)
      row.classList.add('row')
      row.id = (`row${10 - b}`)
      // ---> creates cells in every row
      for (let c = 0; c < cellCountGameBoard; c++) {
        const cellGB = document.createElement('div')
        cellGB.textContent = b + ' - G' + c
        row.appendChild(cellGB)
        rows[b].push(cellGB)
        cellGB.dataset.cellNum = c + 1
        cellGB.classList.add('game-board-empty')
        // ---> selects the last cell of every row
        if (cellGB.dataset.cellNum === '5') {
          cellGB.id = (`result${10 - b}`)
          cellGB.classList.remove('game-board-empty')
          cellGB.classList.add('results')
          cellGB.textContent = ''
          // ---> creates Result cells
          for (let d = 0; d < cellCountGameBoardResult; d++) {
            const cellR = document.createElement('div')
            cellR.textContent = d
            cellGB.appendChild(cellR)
            resultsAll[b].push(cellR)

          }
        }
      }
    }
    paintUserCodeGrid()
    handleRandomCode(arrayOfCodeParts)
    paintRandomCode()
  }

  // ---> paints userCode with code 
  function paintUserCodeGrid() {
    for (let i = 0; i < arrayOfCodeParts.length; i++) {
      cellsUserCode[i].classList.add(codeParts[i])
    }
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
  }

  function paintRandomCode() {
    for (let i = 0; i < cellsCode.length; i++) {
      cellsCode[i].classList.add(randomCode[i])
    }
  }

  // ---> playerCode changer 
  function handleKeyUp(event) {
    const x = playerCodePosition % widthUserCode
    if (event.keyCode === 38) {
      if (cellsUserCode[playerCodePosition].classList.contains(codeParts[0])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[0])
        cellsUserCode[playerCodePosition].classList.add(codeParts[3])
      } else if (cellsUserCode[playerCodePosition].classList.contains(codeParts[3])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[3])
        cellsUserCode[playerCodePosition].classList.add(codeParts[2])
      } else if (cellsUserCode[playerCodePosition].classList.contains(codeParts[2])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[2])
        cellsUserCode[playerCodePosition].classList.add(codeParts[1])
      } else if (cellsUserCode[playerCodePosition].classList.contains(codeParts[1])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[1])
        cellsUserCode[playerCodePosition].classList.add(codeParts[0])
      }
    } else if (event.keyCode === 40) {
      if (cellsUserCode[playerCodePosition].classList.contains(codeParts[0])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[0])
        cellsUserCode[playerCodePosition].classList.add(codeParts[1])
      } else if (cellsUserCode[playerCodePosition].classList.contains(codeParts[1])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[1])
        cellsUserCode[playerCodePosition].classList.add(codeParts[2])
      } else if (cellsUserCode[playerCodePosition].classList.contains(codeParts[2])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[2])
        cellsUserCode[playerCodePosition].classList.add(codeParts[3])
      } else if (cellsUserCode[playerCodePosition].classList.contains(codeParts[3])) {
        cellsUserCode[playerCodePosition].classList.remove(codeParts[3])
        cellsUserCode[playerCodePosition].classList.add(codeParts[0])
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



  function handleSubmitCode() {
    cellsUserCode[playerCodePosition].classList.remove('code-part-selected')
    codeAnswer = []
    const nextRow = rows[numberOfSubmits]
    const submittedCode = [] // ---> array of classes of Submitted code
    cellsUserCode.forEach(cell => {
      cell.classList.remove('code-part-selected')
      submittedCode.push(cell.className)
      cellsUserCode[0].classList.add('code-part-selected')
    })
    // ---> checks for the code to have all different parts and no repeats
    if (submittedCode.includes(codeParts[0])
      && submittedCode.includes(codeParts[1])
      && submittedCode.includes(codeParts[2])
      && submittedCode.includes(codeParts[3])) {
      messagesBoard.textContent = 'Submitted!'
      // ---> transfers PlayerCode to GameGrid
      nextRow[0].classList.remove('game-board-empty')
      nextRow[0].classList.add(submittedCode[0])
      nextRow[1].classList.remove('game-board-empty')
      nextRow[1].classList.add(submittedCode[1])
      nextRow[2].classList.remove('game-board-empty')
      nextRow[2].classList.add(submittedCode[2])
      nextRow[3].classList.remove('game-board-empty')
      nextRow[3].classList.add(submittedCode[3])
    } else {
      messagesBoard.textContent = 'You can\'t repeat colors!'
      return
    }

    // --->  compares Player's and Random code and gives an array codeAnswer
    for (let i = 0; i < submittedCode.length; i++) {
      if (submittedCode[i] === randomCode[i]) {
        codeAnswer.push('code-right')
      } else if (submittedCode[i] !== randomCode[i]) {
        codeAnswer.push('code-wrong')
      }
    }

    // ---> converts the answer array to random
    handleRandomCode(codeAnswer)
    console.log(codeAnswer)
      
    // ---> transfers randomAnswer to Results grid
    const nextResult = resultsAll[numberOfSubmits]
    
    nextResult[0].classList = ''
    nextResult[0].classList.add(codeAnswer[0])
    nextResult[1].classList.remove(codeAnswer[1])
    nextResult[1].classList.add(codeAnswer[1])
    nextResult[2].classList.remove(codeAnswer[2])
    nextResult[2].classList.add(codeAnswer[2])
    nextResult[3].classList.remove(codeAnswer[3])
    nextResult[3].classList.add(codeAnswer[3])

    console.log(nextResult[0])
    numberOfSubmits++
    playerCodePosition = 0
  }
  console.log(resultTwo)

  // --->  Creates userCode and gameBoard grids

  createUserCodeGrid(playerCodePosition)




  //? EVENTS

  document.addEventListener('keyup', handleKeyUp)
  submitCodeBtn.addEventListener('click', handleSubmitCode)


}
window.addEventListener('DOMContentLoaded', init)