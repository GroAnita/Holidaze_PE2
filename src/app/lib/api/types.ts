export type ApiErrorResponse = {
  errors: { message: string }[];
  status?: string;
  statusCode?: number;
};

export class ApiError extends Error {
  status: number;
  details?: ApiErrorResponse;

  constructor(message: string, status: number, details?: ApiErrorResponse) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export type Media = {
  url: string;
  alt?: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager?: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthProfile = {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager: boolean;
};

export type LoginResponseData = AuthProfile & {
  accessToken: string;
};

export type ApiKeyResponseData = {
  name: string;
  key: string;
};

export type VenueMeta = {
  wifi?: boolean;
  parking?: boolean;
  pets?: boolean;
  breakfast?: boolean;
};

export type Location = {
  city: string;
  country: string;
  address?: string;
  zip?: string;
  continent?: string;
  lat?: number;
  lng?: number;
};
