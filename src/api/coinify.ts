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
   throw new CustomError(res.status, res.data.error_description);

  return Promise.resolve({
   statusCode: 201,
   response: res.data
  });
 } catch (error) {
  return Promise.resolve({
   statusCode: error.statusCode,
   response: error.message
  });
 }
};
