export interface Login {
    email: string;
    senha: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  id_usuario: string;
  message: string;
  email: string;
  cargo: string;
}

export interface Identify {
  nome: string;
  email: string;
  cargo: string;
  id_usuario: number;
}


export interface ChangePassword {
  senhaVelha: string;
  senhaNova: string
}
