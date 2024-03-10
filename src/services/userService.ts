import { UserModel } from "../models/userModel";

export async function serviceGetUsers(): Promise<UserModel[]> {
  // Example logic to fetch data from a database or external service
  const data: UserModel[] = [
    {
      id: 1,
      email: "john@example.com",
      password: "hashed_password_1",
    },
    {
      id: 2,
      email: "jane@example.com",
      password: "hashed_password_2",
    },
    {
      id: 3,
      email: "bob@example.com",
      password: "hashed_password_3",
    },
  ];
  return data;
}
