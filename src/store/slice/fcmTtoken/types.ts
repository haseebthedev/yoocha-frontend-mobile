export interface FcmTokenSliceI {
  loading: boolean;
}

export interface FcmTokenI {
  token: string;
  userId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaveFcmTokenPayloadI {
  token: string;
  userId: string;
}

export interface SaveFcmTokenResponseI {
  result: FcmTokenI;
}

export type RemoveFcmTokenPayloadI = SaveFcmTokenPayloadI;

export interface RemoveFcmTokenResponseI {
  result: {
    result: string;
  };
}
