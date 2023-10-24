
/**
 * Interface para respuesta al login
 */
export interface AuthResponse {
    token: string;
}

/**
 * Interface para las credenciales de login
 */
export interface User  {
    username: string;
    password: string;
    email: string;
}



