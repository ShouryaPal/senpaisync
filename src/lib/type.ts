export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: any; // Replace with your user type
  session?: any; // Replace with your session type
}

export interface CheckEmailResponse {
  success: boolean;
  exists: boolean;
  error?: string;
}
