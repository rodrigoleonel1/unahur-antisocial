export type Usuario = {
  _id: string;
  password:string;
  nickName: string;
  followers: string[];
  following: string[];
};

export type LoginData = {
  nickName: string;
  password: string;
};

export type AuthContextType = {
  user: Usuario | null;
  isAuthenticated: boolean;
  iniciar: (data: LoginData) => Promise<boolean>;
  salir: () => void;
  refrescarUsuario: () => Promise<void>;
};