export interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: string;
  createdAt: string;
}
