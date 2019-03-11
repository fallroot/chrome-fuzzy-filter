/* global chrome */

import List from './list.js'
import { search } from './search.js'
import { getService } from './services/main.js'
import { getActiveTab, isEmpty } from './util.js'

let data
let list
let service

function init (tab) {
  initMessages()
  service = getService(tab)

  chrome.tabs.executeScript({
    file: service.file
  }, result => {
    if (isEmpty(result)) {
      showNoData()
      return
    }

    data = result[0]

    if (isEmpty(data)) {
      showNoData()
      return
    }

    list = new List('#list')
    initHandlers()
  })
}

function initMessages () {
  document.getElementById('input').setAttribute('placeholder', chrome.i18n.getMessage('placeholder'))
  document.querySelector('#none p').innerHTML = chrome.i18n.getMessage('nodata')
}

function showNoData () {
  document.body.classList.add('empty')
}

function initHandlers () {
  const input = document.getElementById('input')
  const list = document.getElementById('list')

  input.addEventListener('input', onInput)
  input.addEventListener('keydown', onKeyDown)
  list.addEventListener('click', onItemClick)
}

function onInput (event) {
  const value = event.target.value

  if (isEmpty(value)) {
    renderEmpty()
  } else {
    renderList(value)
  }
}

function onKeyDown (event) {
  const keyCode = event.keyCode

  if (keyCode === 38) {
    list.prev()
  } else if (keyCode === 40) {
    list.next()
  } else if (keyCode === 9 || keyCode === 13) {
    selectElement(list.select())
  } else {
    return
  }

  event.preventDefault()
}

function onItemClick (event) {
  selectElement(event.target)
}

function renderEmpty () {
  list.empty()
}

function renderList (value) {
  list.render(renderData(filterData(data, value)))
}

function filterData (data, value) {
  return data.map(item => {
    return {
      ...item,
      ...search(item.text, value)
    }
  })
    .filter(item => item.found)
    .sort((a, b) => a.distance - b.distance)
}

function renderData (data) {
  return data.map(item => {
    const text = Array.from(item.text).map((char, index) => {
      if (item.indices.includes(index)) {
        return `<b>${char}</b>`
      } else {
        return char
      }
    }).join('')

    return `<li data-index="${item.index}">${text}</li>`
  }).join('')
}

function selectElement (element) {
  if (!element) {
    return
  }
  chrome.tabs.executeScript({
    code: service.getCode(element.dataset.index)
  })
  window.close()
}

getActiveTab().then(init)
