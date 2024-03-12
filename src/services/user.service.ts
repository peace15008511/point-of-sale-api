import User from "../models/user.model";

export async function createUser(email: string, password: string) {
  try {
    // Create the user
    const newUser = await User.create({ email, password });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Internal server error");
  }
}

export async function getUser(email: string) {
  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    return existingUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Internal server error");
  }
}
