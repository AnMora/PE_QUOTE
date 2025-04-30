"use server";

import bcrypt from "bcrypt";
import { getCollection } from "@/lib/db";
import { RegisterFormSchema, LoginFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function register(state, formData) {
  // **VALIDATE FORM FIELDS
  const validatedFields = RegisterFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // **IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
    };
  }

  // **EXTRACT FORM FIELDS
  const { firstName, lastName, email, password } = validatedFields.data;

  // **CHECK IF EMAIL IS ALREADY REGISTERED
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return { errors: { email: "Email already exist in our database!" } };

  // **HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  //** SAVE IN DN
  const results = await userCollection.insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    range: "user",
  });

  // **CREATE A SESSION
  await createSession(results.insertedId.toString());

  // **REDIRECT
  redirect("/dashboard");
}

export async function registerAdmin(state, formData) {
  // **VALIDATE FORM FIELDS
  const validatedFields = RegisterFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // **IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
    };
  }

  // **EXTRACT FORM FIELDS
  const { firstName, lastName, email, password } = validatedFields.data;

  // **CHECK IF EMAIL IS ALREADY REGISTERED
  const userCollection = await getCollection("admin");
  if (!userCollection) return { errors: { email: "Server error!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return { errors: { email: "Email already exist in our database!" } };

  // **HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  //** SAVE IN DN
  const results = await userCollection.insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    range: "admin",
  });

  // **CREATE A SESSION
  await createSession(results.insertedId.toString());

  // **REDIRECT
  redirect("/dashboard");
}

export async function login(state, formData) {
  // ** CHECK THE INPUTS FORM FIELDS
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // ** VALIDATE FORM FIELDS
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  try {
    const existingUser = await userCollection.findOne({ email });
    if (!existingUser) {
      return { errors: { email: "Invalid Credentials!" } };
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return { errors: { password: "Invalid password!" } };
    }
    await createSession(existingUser._id.toString());
    // console.log(existingUser);
    return { redirectTo: `/dashboard/${existingUser._id.toString()}` };
  } catch (error) {
    console.error("Error during login process:", error);
    return { errors: { email: "An error occurred. Please try again later." } };
  }
}

export async function loginAdmin(state, formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const userCollection = "hola";

  console.log(email);
  console.log(password);
}

export async function logout(params) {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}