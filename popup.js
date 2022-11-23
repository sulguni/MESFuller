document.getElementById("btn_full").addEventListener("click", makeFull);
document.getElementById("btn_rev").addEventListener("click", revert);
function send(write) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {write: write}, function(response) {
      if (!chrome.runtime.lastError) {
        console.log(response.result ? 'Done' : 'Failed')
      } else {
          alert('Can\'t connect to the page, maybe it\'s wrong?')
      }
    });
  });
}
function revert() {
  send(false);
}
function makeFull() {
  send(true);
}