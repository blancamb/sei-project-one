function init() {
  //? ELEMENTS 

  //* DOM Elements
  const root = document.documentElement
  const codeSelector = document.querySelector('.code-selector')
  const theCode = document.querySelector('.the-code')
  const userCode = document.querySelector('.user-code')
  const gameBoard = document.querySelector('.game-board')
  const submitCodeBtn = document.querySelector('.submit-code')
  const messagesBoard = document.querySelector('.message-board')
  const resetBtn = document.querySelector('.reset')
  const codeLengthBtns = document.querySelectorAll('.code-length-btn')
  const optionsLengthBtns = document.querySelectorAll('.options-length-btn')
  const winWindow = document.createElement('div')
  const gameOverWindow = document.createElement('div')
  const main = document.querySelector('.main')
  const resetBtnGameOver = document.createElement('button')
  const resetBtnWin = document.createElement('button')

  //* Code Vars
  const arrayOfCodeParts = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
  let randomCode = arrayOfCodeParts // ---> array of classes of Random code
  let codeAnswer = []
  let randomC = []
  let randomS = []

  //* Game Vars
  let codeSelectorPosition = 0
  let userCodePosition = 0
  let numberOfSubmits = 0

  //* Grid Vars
  // ---> randomCode Grid
  let cellsRandomCode = []
  let widthCode = 4
  let cellCountCode = widthCode
  // ---> codeSelector Grid
  let cellsCodeSelector = []
  let widthCodeSelector = 6
  let cellCountCodeSelector = widthCodeSelector

  // ---> userCode Grid
  let cellsUserCode = []
  let widthUserCode = widthCode
  let cellCountUserCode = widthUserCode

  // ---> GameBoard Grid
  let rowsGameBoard = []
  let cellsGameBoard = []
  let cellsResults = []
  let widthGameBoard = widthCode + 1
  let cellCountGameBoard = widthGameBoard
  let widthGameBoardResult = 2
  let cellCountGameBoardResult = widthGameBoardResult * 2

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
  let rows = [rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rowSeven, rowEight, rowNine, rowTen]

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
  let resultsAll = [resultOne, resultTwo, resultThree, resultFour, resultFive, resultSix, resultSeven, resultEight, resultNine, resultTen]


  //? EXECUTION 
  // ---> creates ALL GRIDS
  function createGameBoard(startingPositionCS) {
    // --->  creates codeSelector grid
    const codeSelectorTotalWidth = widthCodeSelector * 40 + 'px'
    codeSelector.style.setProperty('--code-selector-width', codeSelectorTotalWidth)
    for (let i = 0; i < cellCountCodeSelector; i++) {
      const cellCS = document.createElement('div')
      codeSelector.appendChild(cellCS)
      cellsCodeSelector.push(cellCS)
      cellsCodeSelector[startingPositionCS].classList.add('code-part-selected')
    }
    // ---> creates the Code
    const theCodeTotalWidth = widthCode * 40 + 'px'
    theCode.style.setProperty('--the-code-width', theCodeTotalWidth)
    for (let a = 0; a < cellCountCode; a++) {
      const cellC = document.createElement('div')
      theCode.appendChild(cellC)
      cellsRandomCode.push(cellC)
    }
    // ---> creates the userCode grid
    for (let b = 0; b < cellCountUserCode; b++) {
      const userCodeTotalWidth = widthUserCode * 50 + 'px'
      userCode.style.setProperty('--user-code-width', userCodeTotalWidth)
      const cellUC = document.createElement('div')
      userCode.appendChild(cellUC)
      cellsUserCode.push(cellUC)
      cellUC.classList.add('user-code-empty')
    }
    // ---> creates gameBoard grid: 10 rows
    for (let c = 0; c < 10; c++) {
      const gameBoardTotalWidth = widthGameBoard * 40 + 'px'
      gameBoard.style.setProperty('--game-board-width', gameBoardTotalWidth)
      const row = document.createElement('div')
      gameBoard.appendChild(row)
      rowsGameBoard.push(row)
      row.classList.add('row')
      row.id = (`row${10 - c}`)
      // ---> creates cells in every row
      for (let d = 0; d < cellCountGameBoard; d++) {
        const cellGB = document.createElement('div')
        row.appendChild(cellGB)
        rows[c].push(cellGB)
        cellsGameBoard.push(cellGB)
        cellGB.dataset.cellNum = d + 1
        cellGB.classList.add('game-board-empty')
        // ---> selects the last cell of every row
        if (cellGB.dataset.cellNum === `${widthGameBoard}`) {
          cellGB.id = (`result${10 - c}`)
          cellGB.classList.remove('game-board-empty')
          cellGB.classList.add('results')
          const resultCellsWidth = 100 / (widthCode / 2) + '%'
          cellGB.style.setProperty('--result-cells-width', resultCellsWidth)
          // ---> creates Result cells
          for (let e = 0; e < cellCountGameBoardResult; e++) {
            const cellR = document.createElement('div')
            cellGB.appendChild(cellR)
            resultsAll[c].push(cellR)
            cellsResults.push(cellR)
            cellR.classList.add('results-empty')
          }
        }
      }
    }

    handleRandomCode(arrayOfCodeParts)
    paintCodeSelectorGrid()
    paintRandomCode()
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

  // ---> paints codeSelector with codeParts
  function paintCodeSelectorGrid() {
    randomC = randomCode.slice(0, cellsCodeSelector.length)
    for (let i = 0; i < cellsCodeSelector.length; i++) {
      cellsCodeSelector[i].classList.add(randomC[i])
    }
  }
  // ---> paints the code with a random code
  function paintRandomCode() {
    handleRandomCode(randomC)
    randomS = randomC.slice(0, cellsRandomCode.length)
    for (let i = 0; i < cellsRandomCode.length; i++) {
      cellsRandomCode[i].classList.add(randomS[i])
    }
  }
  // ---> SUBMIT CODE
  function handleSubmitCode(event) {
    codeAnswer = []
    const nextRow = rows[numberOfSubmits]
    const submittedCode = [] // ---> array of classes of Submitted code
    const submittedCodeSorted = submittedCode
    cellsUserCode.forEach(cell => {
      submittedCode.push(cell.className)
    })
    // ---> checks for the code to have all different parts and no repeats
    submittedCodeSorted.slice().sort()
    for (let i = 0; i < submittedCode.length; i++) {
      if (submittedCodeSorted[i] === submittedCodeSorted[i + 1]) {
        messagesBoard.textContent = 'Duplicates are not allowed!'
        return
      }
      // ---> transfers PlayerCode to GameGrid
      nextRow[i].classList = (submittedCode[i])
    }
    // --->  compares Player's and Random code and gives an array codeAnswer
    for (let i = 0; i < submittedCode.length; i++) {
      if (randomS.includes(submittedCode[i])) {
        if (submittedCode[i] === randomS[i]) {
          codeAnswer.push('code-right')
        } else if (submittedCode[i] !== randomS[i]) {
          codeAnswer.push('code-near')
        }
      }
      for (let i = 0; i < cellsUserCode.length; i++) {
        cellsUserCode[i].classList = ('user-code-empty')
      }
      console.log(cellsUserCode)
      cellsCodeSelector[codeSelectorPosition].classList.remove('code-part-selected')
      codeSelectorPosition = 0
      cellsCodeSelector[codeSelectorPosition].classList.add('code-part-selected')
    }
    handleRandomCode(codeAnswer) // ---> converts the answer array to random
    // ---> transfers randomAnswer to Results grid
    const nextResult = resultsAll[numberOfSubmits]
    for (let i = 0; i < codeAnswer.length; i++) {
      nextResult[i].classList.add(codeAnswer[i])
    }
    numberOfSubmits++
    codeSelectorPosition = 0
    // ---> WIN & GAME OVER logic
    if (numberOfSubmits < 10 && (codeAnswer.includes('code-wrong') || codeAnswer.includes('code-near'))) {
      messagesBoard.textContent = 'try again!'
    } else if (numberOfSubmits === 10 && (codeAnswer.includes('code-wrong') || codeAnswer.includes('code-near'))) {
      messagesBoard.textContent = 'GAME OVER'
      gameOverWindow.classList.add('game-over-window')
      main.appendChild(gameOverWindow)
      gameOverWindow.innerHTML = 'Nope...<br >you haven\'t found the right code!<br 7>'
      resetBtnGameOver.classList.add('reset')
      resetBtnGameOver.textContent = 'PLAY AGAIN!'
      gameOverWindow.appendChild(resetBtnGameOver)
    } else if (numberOfSubmits < 10) {
      messagesBoard.textContent = 'YOU WIN'
      winWindow.classList.add('win-window')
      main.appendChild(winWindow)
      winWindow.innerHTML = `Good job! <br /> You've freed ${widthCode} animals from the zoo! <br />`
      resetBtnWin.classList.add('reset')
      resetBtnWin.textContent = 'PLAY AGAIN!'
      winWindow.appendChild(resetBtnWin)
    }
  }


  // ---> codeSelector key events
  function handleKeyUp(event) {
    const x = codeSelectorPosition % widthCodeSelector

    if (event.keyCode === 39) {
      if (x < widthCodeSelector - 1) {
        cellsCodeSelector[codeSelectorPosition].classList.remove('code-part-selected')
        codeSelectorPosition++
        cellsCodeSelector[codeSelectorPosition].classList.add('code-part-selected')
      }
    } else if (event.keyCode === 37) {
      if (x > 0) {
        cellsCodeSelector[codeSelectorPosition].classList.remove('code-part-selected')
        codeSelectorPosition--
        cellsCodeSelector[codeSelectorPosition].classList.add('code-part-selected')
      }
    }
    const numberKeys = [49, 50, 51, 52, 53, 54, 55, 56]
    for (let i = 0; i < numberKeys.length; i++) {
      if (event.keyCode === numberKeys[i]) {
        cellsCodeSelector[codeSelectorPosition].classList.remove('code-part-selected')
        cellsUserCode[i].classList = ''
        cellsUserCode[i].classList.add(cellsCodeSelector[codeSelectorPosition].className)
        cellsCodeSelector[codeSelectorPosition].classList.add('code-part-selected')
        console.log(cellsUserCode)
      }
    }
  }

  function handleResetWinLose () {
    main.removeChild(main.lastChild)
    handleResetGame()
  }

  // ---> RESET
  function resetAllVars() {
    codeSelector.innerHTML = ''
    theCode.innerHTML = ''
    userCode.innerHTML = ''
    gameBoard.innerHTML = ''
    randomCode = arrayOfCodeParts
    randomC = []
    randomS = []
    codeAnswer = []
    codeSelectorPosition = 0
    userCodePosition = 0
    numberOfSubmits = 0
    cellsCodeSelector = []
    cellCountCodeSelector = widthCodeSelector
    cellsRandomCode = []
    cellCountCode = widthCode
    cellsUserCode = []
    widthUserCode = widthCode
    cellCountUserCode = widthUserCode
    rowsGameBoard = []
    cellsGameBoard = []
    cellsResults = []
    widthGameBoard = widthCode + 1
    cellCountGameBoard = widthGameBoard
    widthGameBoardResult = widthCode / 2
    cellCountGameBoardResult = widthGameBoardResult * 2
    rows = [rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rowSeven, rowEight, rowNine, rowTen]
    for (let i = 0; i < rows.length; i++) {
      rows[i] = []
    }
    resultsAll = [resultOne, resultTwo, resultThree, resultFour, resultFive, resultSix, resultSeven, resultEight, resultNine, resultTen]
    for (let i = 0; i < resultsAll.length; i++) {
      resultsAll[i] = []
    }
  }

  function handleResetGame() {
    const resetOk = window.confirm('Press OK to start a new game')
    if (resetOk === true) {
      handleReset()
    }
  }

  // ---> CODE LENGTH SELECTOR
  function handleSelectCodeLength(event) {
    widthCode = parseFloat(event.target.value)
    widthCodeSelector = parseFloat(event.target.value)
    resetAllVars()
    createGameBoard(codeSelectorPosition, userCodePosition)
    optionsLengthBtns.forEach(button => {
      if (widthCode > button.value) {
        button.disabled = true
      } else {
        button.disabled = false
      }
    })
    console.log(widthCode)
    console.log(codeAnswer)
    console.log(cellsUserCode)
  }

  // ---> SELECTOR LENGTH SELECTOR
  function handleSelectOptionsLength(event) {
    widthCodeSelector = parseFloat(event.target.value)
    resetAllVars()
    createGameBoard(codeSelectorPosition, userCodePosition)
  }

  function handleReset() {
    resetAllVars()
    submitCodeBtn.disabled = false
    createGameBoard(codeSelectorPosition, userCodePosition)
  }



  // --->  Creates codeSelector and gameBoard grids
  createGameBoard(0)

  //? EVENTS

  document.addEventListener('keyup', handleKeyUp)
  submitCodeBtn.addEventListener('click', handleSubmitCode)
  resetBtn.addEventListener('click', handleResetGame)
  codeLengthBtns.forEach(button => button.addEventListener('click', handleSelectCodeLength))
  optionsLengthBtns.forEach(button => button.addEventListener('click', handleSelectOptionsLength))
  resetBtnWin.addEventListener('click', handleResetWinLose)
  resetBtnGameOver.addEventListener('click', handleResetWinLose)

}
window.addEventListener('DOMContentLoaded', init)