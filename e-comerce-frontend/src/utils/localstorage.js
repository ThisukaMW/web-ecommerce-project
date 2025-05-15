export const token_key = 'E_COMMERCE_TOKEN'

export const setToken = token => {
  window.localStorage.setItem(token_key, token)
}

export const getToken = () => {
  let token = window.localStorage.getItem(token_key)
  console.log('Token on refresh', token);
  // return token;
  // if(!token){
  //   console.error('Token not found');
  //   return;
  // }
  
  if (!!token) return token
  return false
}

export const isLogin = () => {
  if (!!getToken()) {
    return true
  }
  return false
}

export const logout = () => {
  window.localStorage.clear()
}
