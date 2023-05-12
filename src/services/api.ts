export async function api<TResponse>(
  url: string,
  config: RequestInit = {
    cache: "no-cache",
  }
): Promise<TResponse> {
  return await fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}
