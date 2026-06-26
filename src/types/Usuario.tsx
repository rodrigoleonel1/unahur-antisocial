export type Usuario = {
  _id: string;
  nickName: string;
  followers: Usuario[],
  following: Usuario[]
};