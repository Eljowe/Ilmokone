const checkAuth = async ({ request, response, state }) => {
  if (!state.session.get('user')) {
    response.status = 401;
    response.body = 'unauthorized';
  } else {
    response.status = 200;
    response.body = 'authorized';
  }
};

const logout = async ({ request, response, state }) => {
  if (!state.session.get('user')) {
    response.status = 200;
    response.body = 'unauthorized';
  } else {
    state.session.set('user', null);
    response.status = 200;
    response.body = 'logged out';
  }
};

export { checkAuth, logout };
