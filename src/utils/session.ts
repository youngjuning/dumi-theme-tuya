const store = typeof sessionStorage === 'undefined' ? null : sessionStorage

export const getSession = (key: string) => {
  if (store) {
    return store.getItem(key)
  }
}

export const setSession = (key: string, value: string) => {
  if (store) {
    return store.setItem(key, value)
  }
}

export const clearSession = () => {
  if (store) {
    return store.clear()
  }
}
