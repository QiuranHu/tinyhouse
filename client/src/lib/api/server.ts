interface Body<TVariable> {
  query: string;
  variables?: TVariable;
}

export const server = {
  fetch: async <TData = any, TVariable = any>(body: Body<TVariable>) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.json() as Promise<{ data: TData }>;
  },
};
