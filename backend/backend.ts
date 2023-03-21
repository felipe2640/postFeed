import { IPostData, IOnAddPost } from "../interfaces/post.interface";

export const configBackend = process.env.NEXT_PUBLIC_DB_HOST;

export function getPosts(): Promise<IPostData[]> {
  return fetch(`${configBackend}/posts`, {
    credentials: "include",
  }).then(handleResponse);
}

export function createPost(event: IOnAddPost): Promise<IPostData> {
  const formData = new FormData();
  formData.append("image", event.img);
  formData.append("name", event.name);
  formData.append("message", event.message);

  return fetch(`${configBackend}/posts`, {
    method: "POST",
    body: formData,
  }).then(handleResponse);
}

export function deletePost(id: number): Promise<void> {
  return fetch(`${configBackend}/posts/${id}`, {
    credentials: "include",
    method: "DELETE",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.statusText;
  }
}
