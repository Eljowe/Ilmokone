import { serve } from "./deps.js";
import * as registrationService from "./services/registrationService.js";

const handleGet = async (request) => {
  return Response.json(await registrationService.findAll());
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGet,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find((um) => um.method === request.method && um.pattern.test(request.url));

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 });
  }
};

const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
