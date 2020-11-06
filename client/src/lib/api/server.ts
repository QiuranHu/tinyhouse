interface Body<TVariable> {
  query: string;
  variables?: TVariable;
}

interface Error {
  message: string;
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

    // If the status code is not 200 - 299.
    if (!res.ok) {
      throw new Error("failed to fetch from server");
    }

    return res.json() as Promise<{
      data: TData;
      errors: Error[];
    }>;
  },
};
