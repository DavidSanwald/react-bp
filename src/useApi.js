import axios from "axios";
import React from "react";

const instance = axios.create({
  baseURL: "https://fonoapi.freshpixl.com/v1/"
});

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state, status: "loading" };
    case "SUCCESS":
      return {
        ...state,
        status: "loaded",
        data: action.payload
      };
    case "ERROR":
      return {
        ...state,
        status: "error"
      };
    default:
      throw new Error();
  }
};

const useDataApi = (url, initData) => {
  const [state, dispatch] = React.useReducer(reducer, {
    status: "",
    data: initData
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "INIT" });
        const result = await instance.get(url);

        dispatch({ type: "SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

export default useDataApi;
