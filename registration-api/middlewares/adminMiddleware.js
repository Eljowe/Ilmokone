const restrictedPaths = ['/admin'];

const adminMiddleware = async (context, next) => {
  try {
    const auth = await context.state.session.get('user').admin;
    if (!auth && restrictedPaths.some(path => context.request.url.pathname.startsWith(path))) {
      context.response.redirect('/auth/login');
    } else {
      await next();
    }
  } catch (error) {
    await next();
  }
};

export { adminMiddleware };
