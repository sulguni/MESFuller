let prevWrong: number, prevWrongPercent: number, prevSkipped: number, prevSkippedPercent: number, prevScore: number

chrome.runtime.onMessage.addListener(
  function (request) {
    const writing = request.write
    console.log(writing ? 'Writing...' : 'Erasing...')
    const chart = document.querySelector('svg.recharts-surface')
    if (chart) {
      const graph = chart.querySelector('g.recharts-layer.recharts-pie')
      if (graph) {
        const g = graph.querySelectorAll('g.recharts-layer.recharts-pie-sector')[1]
        if (g) {
          const path = g.querySelector('path')
          if (path) {
            path.setAttribute('fill', writing ? '#6dd16b' : '#ff8b57')
            path.setAttribute('stroke', writing ? '#6dd16b' : '#ff8b57')
          }
        }
        const g1 = graph.querySelectorAll('g.recharts-layer.recharts-pie-sector')[3]
        if (g1) {
          const path = g1.querySelector('path')
          if (path) {
            path.setAttribute('fill', writing ? '#6dd16b' : '#eaeaea')
            path.setAttribute('stroke', writing ? '#6dd16b' : '#eaeaea')
          }
        }
      }
    }
    const correctDotNode = document.querySelector("div[style=\"background-color: rgb(109, 209, 107);\"]")
    const correctTextNode = correctDotNode?.parentNode?.children[1]
    if (!correctTextNode) {
      console.error('Correct text not found!')
      return
    }
    const wrongDotNode = document.querySelector("div[style=\"background-color: rgb(255, 139, 87);\"]")
    const wrongTextNode = wrongDotNode?.parentNode?.children[1]
    if (!wrongTextNode) {
      console.error('Wrong text not found!')
      return
    }
    const skippedDotNode = document.querySelector("div[style=\"background-color: rgb(234, 234, 234);\"]")
    const skippedTextNode = skippedDotNode?.parentNode?.children[1]
    if (!skippedTextNode) {
      console.error('Skippeed text not found!')
      return
    }
    if (writing) {
      let correct = correctTextNode.children[1].innerHTML, correctNum = +correct,
       wrong = wrongTextNode.children[1].innerHTML, wrongNum = +wrong,
       skipped = skippedTextNode.children[1].innerHTML, skippedNum = +skipped
      prevWrong = wrongNum
      prevSkipped = skippedNum
      correctTextNode.children[1].innerHTML = (correctNum + wrongNum + skippedNum).toString()
      wrongTextNode.children[1].innerHTML = '0'
      skippedTextNode.children[1].innerHTML = '0'
      wrong = wrongTextNode.children[2].innerHTML.replace('(', '').replace(')', '').replace('%', '')
      wrongNum = +wrong
      prevWrongPercent = wrongNum
      skipped = skippedTextNode.children[2].innerHTML.replace('(', '').replace(')', '').replace('%', '')
      skippedNum = +skipped
      prevSkippedPercent = skippedNum
      correctTextNode.children[2].innerHTML = '(100%)'
      wrongTextNode.children[2].innerHTML = '(0%)'
      skippedTextNode.children[2].innerHTML = '(0%)'
    } else {
      let correct = correctTextNode.children[1].innerHTML
      let correctNum = +correct
      correctNum -= prevWrong
      correctNum -= prevSkipped
      correctTextNode.children[1].innerHTML = correctNum.toString()
      wrongTextNode.children[1].innerHTML = prevWrong.toString()
      skippedTextNode.children[1].innerHTML = prevSkipped.toString()
      correctTextNode.children[2].innerHTML = '(' + (100 - prevWrongPercent - prevSkippedPercent).toString() + '%)'
      wrongTextNode.children[2].innerHTML = '(' + prevWrongPercent.toString() + '%)'
      skippedTextNode.children[2].innerHTML = '(' + prevSkippedPercent.toString() + '%)'
    }
    let score
    for (const span of document.querySelectorAll("span")) {
      if (span.innerHTML.includes("Результат теста в баллах")) {
        score = span
        break
      }
    }
    score = score?.parentElement?.children[0]
    if (score) {
      if (writing) {
        let score1 = score.innerHTML
        prevScore = +score1.split('/')[0]
        score1 = score1.split('/')[1] + '/' + score1.split('/')[1];
        score.innerHTML = score1
      } else {
        let score1 = score.innerHTML
        score1 = prevScore.toString() + '/' + score1.split('/')[1]
        score.innerHTML = score1
      }
    }
    return false
  }
)