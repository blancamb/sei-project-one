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
  const resetBtn = document.querySelector('.restart')
  const codeLengthBtns = document.querySelectorAll('.code-length-btn')
  const optionsLengthBtns = document.querySelectorAll('.options-length-btn')

  //* Code Vars
  let arrayOfCodeParts = ['code-part-a', 'code-part-b', 'code-part-c', 'code-part-d', 'code-part-e', 'code-part-f', 'code-part-g', 'code-part-h']
  let randomCode = arrayOfCodeParts // ---> array of classes of Random code
  let codeAnswer = []
  let randomC = []

  //* Game Vars
  let codeSelectorPosition = 0
  let userCodePosition = 0
  let numberOfSubmits = 0

  //* Grid Vars
  // ---> codeSelector Grid
  let cellsCodeSelector = []
  let widthCodeSelector = arrayOfCodeParts.length
  let cellCountCodeSelector = widthCodeSelector
  // ---> randomCode Grid
  let cellsRandomCode = []
  let widthCode = 4
  let cellCountCode = widthCode
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
  function createGameBoard(startingPositionCS, startingPositionUC) {
    // --->  creates codeSelector grid
    for (let i = 0; i < cellCountCodeSelector; i++) {
      const codeSelectorTotalWidth = widthCodeSelector * 40 + 'px'
      codeSelector.style.setProperty('--code-selector-width', codeSelectorTotalWidth)
      const cellCS = document.createElement('div')
      cellCS.textContent = 'CS' + i
      codeSelector.appendChild(cellCS)
      cellsCodeSelector.push(cellCS)
      cellsCodeSelector[startingPositionCS].classList.add('code-part-selected')
    }
    // ---> creates the Code
    const theCodeTotalWidth = widthCode * 40 + 'px'
    theCode.style.setProperty('--the-code-width', theCodeTotalWidth)
    for (let a = 0; a < cellCountCode; a++) {
      const cellC = document.createElement('div')
      cellC.textContent = 'C' + a
      theCode.appendChild(cellC)
      cellsRandomCode.push(cellC)
    }
    // ---> creates the userCode grid
    for (let b = 0; b < cellCountUserCode; b++) {
      const userCodeTotalWidth = widthUserCode * 40 + 'px'
      userCode.style.setProperty('--user-code-width', userCodeTotalWidth)
      const cellUC = document.createElement('div')
      cellUC.textContent = 'UC' + b
      userCode.appendChild(cellUC)
      cellsUserCode.push(cellUC)
      cellsUserCode[startingPositionUC].classList.add('user-code-selected')
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
        cellGB.textContent = c + ' - G' + d
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
          cellGB.textContent = ''
          const resultCellsWidth = 100 / (widthCode / 2) + '%'
          cellGB.style.setProperty('--result-cells-width', resultCellsWidth)
          // ---> creates Result cells
          for (let e = 0; e < cellCountGameBoardResult; e++) {
            const cellR = document.createElement('div')
            cellR.textContent = e
            cellGB.appendChild(cellR)
            resultsAll[c].push(cellR)
            cellsResults.push(cellR)
            cellR.classList.add('results-empty')
          }
        }
      }
    }
    paintCodeSelectorGrid()
    handleRandomCode(arrayOfCodeParts)
    paintRandomCode()
  }

  // ---> paints codeSelector with codeParts
  function paintCodeSelectorGrid() {
    for (let i = 0; i < cellsCodeSelector.length; i++) {
      cellsCodeSelector[i].classList.add(arrayOfCodeParts[i])
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
    randomC = randomCode.slice(0, cellsRandomCode.length)
    for (let i = 0; i < cellsRandomCode.length; i++) {
      cellsRandomCode[i].classList.add(randomC[i])
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
    } else if (event.keyCode === 13) {
      cellsCodeSelector[codeSelectorPosition].classList.remove('code-part-selected')
      cellsUserCode[userCodePosition].classList = ''
      cellsUserCode[userCodePosition].classList.add(cellsCodeSelector[codeSelectorPosition].className)
      if (userCodePosition < widthUserCode - 1) {
        userCodePosition++
      } else {
        userCodePosition = 0
      }
      cellsUserCode[userCodePosition].classList.add('user-code-selected')
      cellsCodeSelector[codeSelectorPosition].classList.add('code-part-selected')
    }

    // ---> userCode key events
    // const xx = userCodePosition % widthUserCode
    // if (event.keyCode === 88) {
    //   if (xx < widthUserCode - 1) {
    //     cellsUserCode[userCodePosition].classList.remove('user-code-selected')
    //     userCodePosition++
    //     cellsUserCode[userCodePosition].classList.add('user-code-selected')
    //   }

    // } else if (event.keyCode === 90) {
    //   if (xx > 0) {
    //     cellsUserCode[userCodePosition].classList.remove('user-code-selected')
    //     userCodePosition--
    //     cellsUserCode[userCodePosition].classList.add('user-code-selected')
    //   }
    // }
  }
  console.log(userCodePosition)

  function handleSubmitCode() {
    cellsUserCode[userCodePosition].classList.remove('user-code-selected')
    codeAnswer = []
    const nextRow = rows[numberOfSubmits]
    const submittedCode = [] // ---> array of classes of Submitted code
    cellsUserCode.forEach(cell => {
      cell.classList.remove('user-code-selected')
      submittedCode.push(cell.className)
      cellsUserCode[userCodePosition].classList.add('user-code-selected')
    })
    // ---> checks for the code to have all different parts and no repeats
    submittedCode.sort()
    for (let i = 0; i < submittedCode.length; i++) {
      if (submittedCode[i] === submittedCode[i + 1]) {
        console.log('duplicates!')
        return
      }
      // ---> transfers PlayerCode to GameGrid
      nextRow[i].classList = (submittedCode[i])
    }
    // --->  compares Player's and Random code and gives an array codeAnswer
    for (let i = 0; i < submittedCode.length; i++) {
      if (randomC.includes(submittedCode[i])) {
        if (submittedCode[i] === randomC[i]) {
          codeAnswer.push('code-right')
        } else if (submittedCode[i] !== randomC[i]) {
          codeAnswer.push('code-near')
        }
      } else {
        codeAnswer.push('code-wrong')
      }

    }

    handleRandomCode(codeAnswer) // ---> converts the answer array to random

    // ---> transfers randomAnswer to Results grid
    const nextResult = resultsAll[numberOfSubmits]
    for (let i = 0; i < codeAnswer.length; i++) {
      nextResult[i].classList.add(codeAnswer[i])
    }
    numberOfSubmits++
    codeSelectorPosition = 0
    userCodePosition = 0
    // ---> WIN logic
    if (numberOfSubmits < 10 && codeAnswer.includes('code-wrong')) {
      messagesBoard.textContent = 'try again!'
      // ---> GAME OVER logic
    } else if (numberOfSubmits >= 10 && codeAnswer.includes('code-wrong')) {
      messagesBoard.textContent = 'YOU LOSE'
      submitCodeBtn.disabled = true
    } else if (numberOfSubmits < 10) {
      messagesBoard.textContent = 'YOU WIN'
    }

  }
  console.log(cellCountGameBoard)

  function resetAllVars() {
    codeSelector.innerHTML = ''
    theCode.innerHTML = ''
    userCode.innerHTML = ''
    gameBoard.innerHTML = ''
    arrayOfCodeParts = ['code-part-a', 'code-part-b', 'code-part-c', 'code-part-d', 'code-part-e', 'code-part-f', 'code-part-g', 'code-part-h']
    randomCode = arrayOfCodeParts 
    randomC = []
    codeSelectorPosition = 0
    userCodePosition = 0
    numberOfSubmits = 0
    cellsCodeSelector = []
    widthCodeSelector = arrayOfCodeParts.length
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
    submitCodeBtn.disabled = false
    createGameBoard(codeSelectorPosition, userCodePosition)
  }


  function handleReset() {
    const resetOk = window.confirm('If you press OK, score will restart! Press CANCEL to go back to the game')
    if (resetOk === true) {
      resetAllVars()
    }
  }



  function handleSelectCodeLength(event) {
    widthCode = parseFloat(event.target.value)
    resetAllVars()
  }


  // ! function handleSelectOptionsLength(event) {
  // !  console.log('clicked button ' + event.target.value)
  // !}



  // --->  Creates codeSelector and gameBoard grids
  createGameBoard(codeSelectorPosition, userCodePosition)




  //? EVENTS

  document.addEventListener('keyup', handleKeyUp)
  submitCodeBtn.addEventListener('click', handleSubmitCode)
  resetBtn.addEventListener('click', handleReset)
  codeLengthBtns.forEach(button => button.addEventListener('click', handleSelectCodeLength))
  //!optionsLengthBtns.forEach(button => button.addEventListener('click', handleSelectOptionsLength))


}
window.addEventListener('DOMContentLoaded', init)