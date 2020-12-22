export type UserAuthed = {
  id: number;
  role: string;
  email: string;
  name: string;
};

export type UserProps = {
  user: UserAuthed;
};

export type Roles = "Customer" | "Employee" | "Manager";
