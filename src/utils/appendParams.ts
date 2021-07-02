export const toQueryStr = (obj: any) => {
  if (obj) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key]
      }
    }
    return new URLSearchParams(obj).toString()
  } else {
    return ''
  }
}

export const appendParams = (url: string, params?: object) => {
  if (url && params) {
    if (url.indexOf('?') !== -1) {
      return `${url}&${toQueryStr(params)}`
    } else {
      return `${url}?${toQueryStr(params)}`
    }
  }
  return url
}