const isLoggedIn = (token: string, expires: string) => {
  return token && parseInt(expires) >= Date.now()
}

export default isLoggedIn
