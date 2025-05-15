import { config } from "./config";
import { getToken } from "./localstorage";

// const getRequest = async (path) => {
//   // console.log(getToken())
//   try {
//     const params = {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + getToken(),
//       },
//     };
//     const res = await fetch(config.baseURL + path, params);
//     console.log({ res });
//     const data = await res.text();
//     return { statusCode: res.status, data };
//   } catch (e) {
//     console.error(error in get Request (${path}) :- , e);
//     return { statusCode: 400, data: [] };
//   }
// };

const getRequest = async (path) => {
  try {
    const res = await fetch(config.baseURL + path, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
    console.log("Token in getRequest", getToken());
    

    const contentType = res.headers.get("content-type") || "";
    const isJSON = contentType.includes("application/json");

    const data = isJSON ? await res.json() : await res.text();

    return {
      statusCode: res.status,
      data,
      isJSON,
    };
  } catch (e) {
    console.error(`error in getRequest (${path}): `, e);
    return { statusCode: 400, data: [], isJSON: false };
  }
};

const postRequest = async (path, body) => {
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.baseURL + path, params);
    // console.log(res)

    const data = await res.text();
    // console.log({data})
    return { statusCode: res.status, data };
  } catch (e) {
    console.log("error in post Request (${path}) :- , e");
  }
};

const DeleteRequest = async (path) => {
  try {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };

    const res = await fetch(config.baseURL + path, params);

    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log("error in Delete Request (${path}) :- , e");
  }
};

const putRequest = async (path, body) => {
  try {
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.baseURL + path, params);

    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (e) {
    console.log("error in PUT Request (${path}) :- , e");
  }
};

export const Api = {
  getRequest,
  postRequest,
  DeleteRequest,
  putRequest,
};
