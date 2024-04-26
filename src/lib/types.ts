export interface FilteredUser {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ComplainRegister {
  id?: string;
  name: string;
  email: string;
  phone: string;
  picture?: boolean;
  location?: string;
  manualLocation: string;
}

export interface ComplainResponse {
  status: string;
  
}
export interface UserResponse {
  status: string;
  data: {
    user: FilteredUser;
  };
}

export interface UserLoginResponse {
  status: string;
  token: string;
}
