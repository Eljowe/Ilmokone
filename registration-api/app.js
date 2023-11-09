import { serve } from "./deps.js";
import * as registrationService from "./services/registrationService.js";

const handleGet = async (request) => {
  return Response.json(await registrationService.findAll());
};

const handleGetRegistered = async (request) => {
  return Response.json(await registrationService.findRegistered());
};

const handleGetRegisteredForEventId = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  try {
    return Response.json(await registrationService.findRegisteredForEvent(id));
  } catch (e) {
    return Response.json({ error: "no participants" });
  }
};

const handleRegister = async (request) => {
  const requestData = await request.json();
  await programmingAssignmentService.submitAnswer({
    id: taskNum,
    code: requestData.code,
    user_uuid: requestData.user,
    correct: false,
    grader_feedback: "waiting for feedback",
  });
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    fn: handleGet,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/register" }),
    fn: handleRegister,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/registered" }),
    fn: handleGetRegistered,
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/registered/:id" }),
    fn: handleGetRegisteredForEventId,
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
