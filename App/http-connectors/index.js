import { getToken } from "../token-interceptor";
import { Alert } from "react-native";

/**
 *
 *      General http methods
 *
 */

const structureQueryParams = params => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += key + ":" + params[key];
    if (params[keys[index + 1]]) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

export const makeGetRequest = async (
  url,
  attachToken = false,
  params = null
) => {
  let queryString = "";
  if (params) {
    queryString = structureQueryParams(params);
  }
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log("Get request: ", url + queryString, headers);
  return new Promise((resolve, reject) => {
    try {
      fetch(url + queryString, {
        method: "GET",
        headers: headers
      })
        .then(res => res.json())
        .then(jsonResponse => {
          resolve(jsonResponse);
        })
        .catch(e => {
          console.log("XHR GET Error: ", e);
          reject(e);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makePostRequest = async (
  url,
  attachToken = false,
  params = {}
) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("Error fetching auth token: ", e);
    }
  }
  console.log("post log", url, params);
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(params)
      })
        .then(
          res => res.json(),
          error => {
            reject(error);
          }
        )
        .then(
          jsonResponse => {
            console.log("TCL: jsonResponse", jsonResponse);
            resolve(jsonResponse);
          },
          error => {
            reject(error);
          }
        )
        .catch(error => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

export const makePutRequest = async (url, attachToken = false, params = {}) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (attachToken) {
    try {
      const authToken = await getToken();
      if (authToken) {
        headers["Authorization"] = "Bearer " + authToken;
      }
    } catch (e) {
      console.log("Error fetching auth token: ", e);
    }
  }
  console.log("post log", url, params);
  return new Promise((resolve, reject) => {
    try {
      fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(params)
      })
        .then(
          res => res.json(),
          error => {
            reject(error);
          }
        )
        .then(
          jsonResponse => {
            console.log("TCL: jsonResponse", jsonResponse);
            resolve(jsonResponse);
          },
          error => {
            reject(error);
          }
        )
        .catch(error => {
          reject(error);
        });
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};
