import axios from "axios";
import { CustomError } from "./customs";

interface CustomResponse {
  statusCode: number;
  response: any;
}

const environment = process.env.NODE_ENV;

const apis = {
  development: "https://app-api.sandbox.coinify.com",
  production: "https://app-api.coinify.com"
};

const COINIFY_API = apis[environment] || "https://app-api.sandbox.coinify.com";

export const createBankAccount = async (body: any): Promise<CustomResponse> => {
  try {
    const res = await axios.post(
      COINIFY_API + "/bank-accounts",
      Object.assign({}, { ...body })
    );

    if (res.status >= 400)
      throw new CustomError(
        res.status,
        res.data.error_description || "An error has occured"
      );

    return Promise.resolve({
      statusCode: 201,
      response: res.data
    });
  } catch (error) {
    return Promise.resolve({
      statusCode: error.statusCode || 500,
      response: error.message
    });
  }
};

export const getBankAccount = async (id: string): Promise<CustomResponse> => {
  try {
    const res = await axios.get(`${COINIFY_API}/bank-accounts/${id}`);

    if (res.status >= 400)
      throw new CustomError(
        res.status,
        res.data.error_description || "An error has occured"
      );

    return Promise.resolve({
      statusCode: 200,
      response: res.data
    });
  } catch (error) {
    return Promise.resolve({
      statusCode: error.statusCode || 500,
      response: error.message
    });
  }
};
