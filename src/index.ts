import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import * as helpers from "./helpers";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
 return {
  headers: helpers.headersify(),
  statusCode: 200,
  body: JSON.stringify(
   {
    message:
     "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
    input: event
   },
   null,
   2
  )
 };
};

export const registerBank: APIGatewayProxyHandler = async (event, _context) => {
 return {
  headers: helpers.headersify()
 };
};
