import { instances } from "./AxiosInstant";

export const HttpClient = {
  get: instances.httpClient.get,
  post: instances.httpClient.post,
  put: instances.httpClient.put,
  delete: instances.httpClient.delete,
  patch: instances.httpClient.patch,
  postForm: instances.httpClient.postForm,
};
