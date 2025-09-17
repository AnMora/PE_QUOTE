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
  if (!userCollection) return { errors: { email: "Error de servidor!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return { errors: { email: "Email ya existe en base de datos!" } };

  // **HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  //** SAVE IN DN
  // const results = await userCollection.insertOne({
  await userCollection.insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    range: "user",
  }); 

  // **CREATE A SESSION
  // await createSession(results.insertedId.toString());

  // **REDIRECT
  redirect("/admin/information/users/show-users");
}

export async function registerNurse(state, formData) {
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
  const userCollection = await getCollection("nurse");
  if (!userCollection) return { errors: { email: "Error de servidor!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return { errors: { email: "Email ya existe en base de datos!" } };

  // **HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  //** SAVE IN DN
  // const results = await userCollection.insertOne({
  await userCollection.insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    range: "nurse",
  });

  // **CREATE A SESSION
  // await createSession(results.insertedId.toString());

  // **REDIRECT
  redirect("/admin/information/nurses/show-nurses");
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
  if (!userCollection) return { errors: { email: "Error de servidor!" } };

  const existingUser = await userCollection.findOne({ email });
  if (existingUser)
    return { errors: { email: "Email ya existe en base de datos!" } };

  // **HASH THE PASSWORD
  const hashedPassword = await bcrypt.hash(password, 10);

  //** SAVE IN DN
  // const results = await userCollection.insertOne({
  await userCollection.insertOne({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    range: "admin",
  });

  // **CREATE A SESSION
  // await createSession(results.insertedId.toString());

  // **REDIRECT
  redirect("/admin/information/admins/show-admins");
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
  if (!userCollection) return { errors: { email: "Error de servidor!" } };

  try {
    const existingUser = await userCollection.findOne({ email });
    if (!existingUser) {
      return { errors: { email: "Credenciales invalidos!" } };
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return { errors: { password: "Contraseña invalida!" } };
    }
    await createSession(existingUser._id.toString());
    // console.log(existingUser);
    return { redirectTo: `/dashboard/${existingUser._id.toString()}` };
  } catch (error) {
    console.error("Error durante el proceso de inicio de sesión: ", error);
    return {
      errors: {
        email: "Se ha producido un error. Inténtelo de nuevo más tarde.",
      },
    };
  }
}

export async function loginNurse(state, formData) {
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

  const userCollection = await getCollection("nurse");
  if (!userCollection) return { errors: { email: "Error de servidor!" } };

  try {
    const existingNurse = await userCollection.findOne({ email });
    if (!existingNurse) {
      return { errors: { email: "Credenciales invalidos!" } };
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingNurse.password
    );
    if (!matchedPassword) {
      return { errors: { password: "Contraseña invalida!" } };
    }
    await createSession(existingNurse._id.toString());
    // console.log(existingNurse);
    return { redirectTo: `/nurse/dashboard/${existingNurse._id.toString()}` };
  } catch (error) {
    console.error("Error durante el proceso de inicio de sesión: ", error);
    return {
      errors: {
        email: "Se ha producido un error. Inténtelo de nuevo más tarde.",
      },
    };
  }
}

export async function loginAdmin(state, formData) {
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

  const userCollection = await getCollection("admin");
  if (!userCollection) return { errors: { email: "Error de servidor!" } };

  try {
    const existingAdmin = await userCollection.findOne({ email });
    if (!existingAdmin) {
      return { errors: { email: "Credenciales invalidos!" } };
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!matchedPassword) {
      return { errors: { password: "Contraseña invalida!" } };
    }
    await createSession(existingAdmin._id.toString());
    // console.log(existingAdmin);
    return { redirectTo: `/admin/dashboard/${existingAdmin._id.toString()}` };
  } catch (error) {
    console.error("Error durante el proceso de inicio de sesión: ", error);
    return {
      errors: {
        email: "Se ha producido un error. Inténtelo de nuevo más tarde.",
      },
    };
  }
}

export async function logout(params) {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
