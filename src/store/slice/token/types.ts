export interface LoadingI {
  loading: boolean;
}

export interface TokenI {
  token: "absssss";
  userId: "aaasasasa";
  _id: "66bdf15879ead741d2e425af";
  createdAt: "2024-08-15T12:15:20.946Z";
  updatedAt: "2024-08-15T12:15:20.947Z";
}

export interface SaveTokenPayloadI {
  token: string;
  userId: string;
}

export interface SaveTokenResponseI {
  result: TokenI;
}

export interface ListTokenPayloadI {
  userId: string;
}

export interface ListTokenResponseI {
  result: {
    docs: TokenI[];
  };
}
