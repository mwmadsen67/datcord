
export const csrfFetch = async (url, options = {}) => {
  options.headers ||= {}
  options.method ||= 'GET'

  if (options.method !== 'GET') {
    options.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': sessionStorage.getItem("X-CSRF-Token")
    }
  }

  const response = await fetch(url, options)

  if (response.ok) {
    return response;
  } else {
    throw response;
  }
}

export const restoreCSRF = async () => {
  const response = await csrfFetch('api/session');

  const token = response.headers.get('X-CSRF-Token')
  if (token) sessionStorage.setItem('X-CSRF-Token', token)

  return response;
}
