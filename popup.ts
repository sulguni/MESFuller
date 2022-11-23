const requiredURL = 'https://uchebnik.mos.ru/exam/'
registerButtons()
function registerButtons() {
  const fullButton = document.getElementById('btn_full'), revertButton = document.getElementById('btn_rev')
  if (fullButton && revertButton) {
    fullButton.addEventListener("click", makeFull)
    revertButton.addEventListener("click", revert)
  }
}
function send(write: boolean) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0], url = tab.url, id = tab.id
    if (url && id) {
      if ((url.length > requiredURL.length) && (url.substring(0, requiredURL.length) === requiredURL)) {
        chrome.tabs.sendMessage(id, { write: write });
      }
      else {
        alert('You can only use this extension on uchebnik.mos.ru!')
      }
    }
  })
}
function revert() {
  send(false)
}
function makeFull() {
  send(true)
}