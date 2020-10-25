export const LIST = '/forms';
export const CREATE = '/create';
export const SIGN_IN = '/sign-in';
export const EDIT = (id?: string) => `/edit/${id ? id : ':id'}`;
export const PREVIEW = (id?: string) => `/preview/${id ? id : ':id'}`;
