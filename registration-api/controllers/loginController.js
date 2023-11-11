import * as userService from '../services/userService.js';
import { bcrypt } from '../deps.js';

const processLogin = async ({ request, response, state }) => {
  try {
    const body = request.body({ type: 'json' });
    const params = await body.value;
    if (!params.email | !params.password) {
      response.status = 401;
      response.body = 'login error, missing params';
      return;
    }
    const userFromDatabase = await userService.findUserByEmail(params.email);
    if (userFromDatabase.length != 1) {
      response.status = 401;
      response.body = 'login error at email';
      return;
    }
    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(params.password, user.password);
    if (!passwordMatches) {
      response.status = 401;
      response.body = 'login error at password';
      return;
    }

    state.session.set('user', user);
    response.status = 200;
    response.body = 'authorized';
    return;
  } catch (error) {
    console.error(error);
    response.status = 500;
    response.body = { error: 'Internal Server Error' };
  }
};

export { processLogin };
