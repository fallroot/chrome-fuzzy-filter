function getService (tab) {
  const url = new URL(tab.url)
  const services = [
    {
      file: 'js/services/amazon.js',
      test: () => /amazon.com$/i.test(url.hostname),
      getCode: index => {
        return `document.querySelector('[data-fs-index="${index}"] a').click()`
      }
    },
    {
      file: 'js/services/default.js',
      test: () => true,
      getCode: index => {
        return `
          var parent = document.activeElement.closest('select, ul')
          if (parent) {
            if (parent.tagName === 'SELECT') {
              parent.selectedIndex = ${index}
              parent.dispatchEvent(new Event('change'))
              parent.dispatchEvent(new Event('input'))
            } else {
              parent.querySelector('[data-fs-index="${index}"]').click()
            }
          }
        `
      }
    }
  ]

  return services.find(service => {
    return service.test()
  })
}

export {
  getService
}
