let prevWrong, prevWrongPercent, prevSkipped, prevSkippedPercent, prevScore

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    let success = false
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
            success = true
          }
        }
        const g1 = graph.querySelectorAll('g.recharts-layer.recharts-pie-sector')[3]
        if (g1) {
          const path = g1.querySelector('path')
          if (path) {
            path.setAttribute('fill', writing ? '#6dd16b' : '#eaeaea')
            path.setAttribute('stroke', writing ? '#6dd16b' : '#eaeaea')
            success &&= true
          }
        }
      }
    }
    const nums = document.querySelectorAll('span.jss55')
    const persents = document.querySelectorAll('span.jss56')
    if (writing) {
      let correct = nums[0].innerHTML
      correct = +correct
      let wrong = nums[1].innerHTML
      wrong = +wrong
      prevWrong = wrong
      let skipped = nums[3].innerHTML
      skipped = +skipped
      prevSkipped = skipped
      nums[0].innerHTML = (correct + wrong + skipped).toString()
      nums[1].innerHTML = 0
      nums[3].innerHTML = 0
      wrong = persents[1].innerHTML.replace('(', '').replace(')', '').replace('%', '')
      wrong = +wrong
      prevWrongPercent = wrong
      skipped = persents[3].innerHTML.replace('(', '').replace(')', '').replace('%', '')
      skipped = +skipped
      prevSkippedPercent = skipped
      persents[0].innerHTML = '(100%)'
      persents[1].innerHTML = '(0%)'
      persents[3].innerHTML = '(0%)'
    } else {
      let correct = nums[0].innerHTML
      correct = +correct
      correct -= prevWrong
      correct -= prevSkipped
      nums[0].innerHTML = correct.toString()
      nums[1].innerHTML = prevWrong.toString()
      nums[3].innerHTML = prevSkipped.toString()
      persents[0].innerHTML = '(' + (100 - prevWrongPercent - prevSkippedPercent).toString() + '%)'
      persents[1].innerHTML = '(' + prevWrongPercent.toString() + '%)'
      persents[3].innerHTML = '(' + prevSkippedPercent.toString() + '%)'
    }
    const score = document.querySelector('span.jss50')
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
    success &&= true
    sendResponse({ result: success })
  }
);