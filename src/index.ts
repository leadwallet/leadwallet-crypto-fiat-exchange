import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import * as helpers from "./helpers";
import * as api from "./api";

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    headers: helpers.headersify(),
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Successful. App is running in ${process.env.NODE_ENV}`,
        input: event
      },
      null,
      2
    )
  };
};

export const registerBank: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const ev = await api.Coinify.createBankAccount(event.body);

    if (ev.statusCode >= 400)
      throw new api.APIError(ev.statusCode, ev.response);

    return {
      headers: helpers.headersify(),
      statusCode: ev.statusCode || 201,
      body: JSON.stringify({
        statusCode: ev.statusCode || 201,
        response: ev.response
      })
    };
  } catch (error) {
    return {
      headers: helpers.headersify(),
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message)
    };
  }
};

export const getBankDetails: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const ev = await api.Coinify.getBankAccount(event.pathParameters.id);

    if (ev.statusCode >= 400)
      throw new api.APIError(ev.statusCode, ev.response);

    return {
      headers: helpers.headersify(),
      statusCode: ev.statusCode || 200,
      body: JSON.stringify({
        statusCode: ev.statusCode || 200,
        response: ev.response
      })
    };
  } catch (error) {
    return {
      headers: helpers.headersify(),
      statusCode: error.statusCode || 500,
      body: JSON.stringify(error.message)
    };
  }
};
