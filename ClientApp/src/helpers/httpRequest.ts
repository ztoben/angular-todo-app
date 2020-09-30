// https://www.carlrippon.com/fetch-with-async-await-and-typescript/

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export async function httpRequest<T>(
  request: RequestInfo
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  try {
    response.parsedBody = await response.json();
  } catch (ex) {}

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<HttpResponse<T>> {
  return await httpRequest<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "post",
    body: JSON.stringify(body),
    headers: new Headers({ "content-type": "application/json" })
  }
): Promise<HttpResponse<T>> {
  return await httpRequest<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "put",
    body: JSON.stringify(body),
    headers: new Headers({ "content-type": "application/json" })
  }
): Promise<HttpResponse<T>> {
  return await httpRequest<T>(new Request(path, args));
}
