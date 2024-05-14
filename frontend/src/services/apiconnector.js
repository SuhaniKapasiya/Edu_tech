import axios from "axios";

export const axiosInstace = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  // console.log("axios me aa gya hu nhai");
  return axiosInstace({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
