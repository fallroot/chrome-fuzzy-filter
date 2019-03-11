const NOT_FOUND = {
  distance: -1,
  found: false,
  indices: []
}

function search (text, keyword) {
  const keywordSize = keyword.length
  let index = 0

  if (keywordSize > text.length) {
    return NOT_FOUND
  }

  index = text.indexOf(keyword)

  if (index >= 0) {
    return {
      distance: 0,
      found: true,
      indices: [...Array(keywordSize).keys()].map(n => n + index)
    }
  }

  const indices = []
  let start = 0

  text = text.toLowerCase()
  keyword = keyword.toLowerCase()

  for (let i = 0; i < keywordSize; ++i) {
    index = text.indexOf(keyword[i], start)

    if (index < 0) {
      return NOT_FOUND
    }

    indices.push(index)
    start = index + 1
  }

  return {
    distance: calcDistances(indices),
    found: true,
    indices
  }
}

function calcDistances (indices) {
  let result = 0

  for (let i = 0, length = indices.length - 1; i < length; ++i) {
    result += indices[i + 1] - indices[i]
  }

  return result
}

export {
  search
}
