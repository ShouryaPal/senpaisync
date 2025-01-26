export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: string; // Replace with your user type
  session?: string; // Replace with your session type
}

export interface CheckEmailResponse {
  success: boolean;
  exists: boolean;
  error?: string;
}
