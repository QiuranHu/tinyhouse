import { useReducer } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
): State<TData> => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: false,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};

type MutationTuple<TData = any, TVariable = any> = [
  (variables?: TVariable | undefined) => Promise<void>,
  State<TData>
];

// query here is used to reference the GraphQL request that is to be made.
export const useMutation = <TData = any, TVariable = any>(
  query: string
): MutationTuple<TData, TVariable> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = async (variables?: TVariable) => {
    try {
      dispatch({ type: "FETCH" });
      const { data, errors } = await server.fetch<TData, TVariable>({
        query,
        variables,
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR" });
      throw console.error(err);
    }
  };

  return [fetch, state];
};
