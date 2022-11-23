document.getElementById("btn_full").addEventListener("click", makeFull);
document.getElementById("btn_rev").addEventListener("click", revert);
const requiredURL = 'https://uchebnik.mos.ru/exam/'
function send(write) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if ((tabs[0].url.length > requiredURL.length) && (tabs[0].url.substring(0, requiredURL.length) === requiredURL)) {
      chrome.tabs.sendMessage(tabs[0].id, { write: write }, function (response) {
        if (!chrome.runtime.lastError) {
          console.log(response.result ? 'Done' : 'Failed')
        } else {
          alert('Can\'t connect to the page, maybe it\'s wrong?')
        }
      });
    }
    else {
      alert('You can only use this extension on uchebnik.mos.ru!')
    }
  });
}
function revert() {
  send(false);
}
function makeFull() {
  send(true);
}