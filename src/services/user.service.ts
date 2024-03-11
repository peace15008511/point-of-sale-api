// user.service.ts
import User from "../models/user.model";

async function createUser(username: string, email: string) {
  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create the user
    const newUser = await User.create({ username, email });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Internal server error");
  }
}

export { createUser };
