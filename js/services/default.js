function init () {
  clear()
  return makeData(document.activeElement)
}

function clear () {
  Array.from(document.querySelectorAll('[data-fs-index]'))
    .forEach(el => el.removeAttribute('data-fs-index'))
}

function makeData (el) {
  if (!el) {
    return
  }

  const parent = el.closest('select, ul')

  if (!parent) {
    return
  }

  return Array.from(parent.querySelectorAll(parent.tagName === 'SELECT' ? 'option' : 'li'))
    .map((element, index) => {
      element.dataset.fsIndex = index
      return {
        element,
        index,
        text: element.textContent
      }
    })
}

init()
