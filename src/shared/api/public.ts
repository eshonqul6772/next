export interface PublicApiResponse<T> {
  data: T;
  meta?: unknown;
  message?: string;
}

const request = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<PublicApiResponse<T>> => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || 'Public API request failed');
  }
  return res.json();
};

export const publicGet = <T>(url: string) => request<T>(url);

export const publicPost = <T, B = unknown>(url: string, body: B) =>
  request<T>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
