import { useState } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type MutationTuple<TData = any, TVariable = any> = [
  (variables?: TVariable | undefined) => Promise<void>,
  State<TData>
];

// query here is used to reference the GraphQL request that is to be made.
export const useMutation = <TData = any, TVariable = any>(
  query: string
): MutationTuple<TData, TVariable> => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false,
  });

  const fetch = async (variables?: TVariable) => {
    try {
      setState({ data: null, loading: true, error: false });

      const { data, errors } = await server.fetch<TData, TVariable>({
        query,
        variables,
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      setState({ data, loading: false, error: false });
    } catch (err) {
      setState({ data: null, loading: false, error: true });
      throw console.error(err);
    }
  };

  return [fetch, state];
};
