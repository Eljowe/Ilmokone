import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.minLength(4)],
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const data = {
    email: params.get("email"),
    password: params.get("password"),
  }
  const [passes, errors] = await validasaur.validate(data, registrationValidationRules);
  if (passes) {
    await userService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password")),
    );
    response.redirect("/auth/login");
  } else {
    render("registration.eta", {errors: errors});
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };