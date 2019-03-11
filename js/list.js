class List {
  constructor (selector) {
    this.element = document.querySelector(selector)
  }
  empty () {
    this.render('')
  }
  render (html) {
    this.element.innerHTML = html
  }
  focus () {
    this.item && this.item.setAttribute('aria-selected', true)
  }
  blur () {
    this.item && this.item.setAttribute('aria-selected', false)
  }
  next () {
    this.blur()
    this.item = (this.item && this.item.nextSibling) || this.element.firstChild
    this.focus()
  }
  prev () {
    this.blur()
    this.item = (this.item && this.item.previousSibling) || this.element.lastChild
    this.focus()
  }
  select () {
    return this.item
  }
}

export default List
