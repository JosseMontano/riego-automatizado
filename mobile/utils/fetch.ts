import {config} from "../constants/http";

export const getServices = async <T>(
  endPoint: string
): Promise<{ data: T[] }> => {
  try {

    const response = await fetch(config.backendUrl + endPoint, {
      method: "GET",
      headers: new Headers({
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: "",
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        data: result,
      };
    }
    return {
      data: [],
    };
  } catch (err) {
    console.error(err);
    return {
      data: [],
    };
  }
};

export async function post<T, R>(
    url: string,
    body: T
  ) {
    try {
      const response = await fetch(config.backendUrl + url, {
        method: "POST",
        headers: new Headers({
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "",
        }),
  
        body: JSON.stringify({
          ...body,
        }),
      });
      //const res = await response.json();
      return response;
    } catch (error) {
      let msgError = "";
      if (error instanceof Error) {
        msgError = error.message;
      }
      return null;
    }
  }