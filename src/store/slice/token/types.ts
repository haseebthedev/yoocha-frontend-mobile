export interface TokenSliceI {
  loading: boolean;
}

export interface TokenI {
  token: string;
  userId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaveTokenPayloadI {
  token: string;
  userId: string;
}

export interface SaveTokenResponseI {
  result: TokenI;
}
