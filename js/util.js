/* global chrome */

function getActiveTab () {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => { resolve(tabs[0]) })
  })
}

function isEmpty (value) {
  return !value || !value.length
}

export {
  getActiveTab,
  isEmpty
}
