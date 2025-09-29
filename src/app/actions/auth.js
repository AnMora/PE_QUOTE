"use server";

import bcrypt from "bcrypt";
import { getCollection } from "@/lib/db";
import {
  RegisterFormSchema,
  LoginFormSchema,
  EditFormSchema,
} from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

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
    range: "supervisor",
  });

  // **CREATE A SESSION
  // await createSession(results.insertedId.toString());

  // **REDIRECT
  redirect("/admin/information/admins/show-admins");
}

async function genericEditProfile(formData, collectionName, userType, redirectPath) {
  // **EXTRACT FORM FIELDS
  const id = formData.get("id");

  // **VALIDATE FORM FIELDS
  const validatedFields = EditFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
    confirmPassword: formData.get("confirmPassword") || undefined,
    currentPassword: formData.get("currentPassword") || undefined,
  });

  // **IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const collection = await getCollection(collectionName);
  if (!collection) return { errors: { form: "Error de servidor!" } };

  const updateData = {
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    email: validatedFields.data.email,
  };

  // **IF A NEW PASSWORD IS PROVIDED, HASH AND ADD IT
  if (validatedFields.data.password) {
    const user = await collection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    if (!user) {
      return { errors: { form: `${userType} no encontrado.` } };
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      validatedFields.data.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return { errors: { currentPassword: "La contraseña actual no es correcta." } };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    updateData.password = hashedPassword;
  }

  try {
    await collection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updateData }
    );
  } catch (error) {
    return { errors: { form: `No se pudo actualizar el ${userType}.` } };
  }

  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function editAdmin(state, formData) {
  return genericEditProfile(
    formData,
    "admin",
    "Administrador",
    "/admin/information/admins/show-admins"
  );
}

export async function editNurse(state, formData) {
  return genericEditProfile(formData, "nurse", "Enfermero/a", "/admin/information/nurses/show-nurses");
}

export async function editUser(state, formData) {
  return genericEditProfile(formData, "users", "Empleado/a", "/admin/information/users/show-users");
}

async function genericLogin(formData, collectionName, redirectPathPrefix) {
  // ** CHECK THE INPUTS FORM FIELDS
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }
  
  const { email, password } = validatedFields.data;

  const userCollection = await getCollection(collectionName);
  if (!userCollection) return { errors: { email: "Error de servidor!" } };

  try {
    const existingUser = await userCollection.findOne({ email });
    if (!existingUser) {
      return { errors: { email: "Credenciales invalidos!" } };
    }
    const matchedPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchedPassword) {
      return { errors: { password: "Contraseña invalida!" } };
    }
    await createSession(existingUser._id.toString());
    return { redirectTo: `${redirectPathPrefix}/${existingUser._id.toString()}` };
  } catch (error) {
    console.error("Error durante el proceso de inicio de sesión: ", error);
    return { errors: { email: "Se ha producido un error. Inténtelo de nuevo más tarde." } };
  }
}

export async function login(state, formData) {
  return genericLogin(formData, "users", "/dashboard");
}

export async function loginNurse(state, formData) {
  return genericLogin(formData, "nurse", "/nurse/dashboard");
}

export async function loginAdmin(state, formData) {
  return genericLogin(formData, "admin", "/admin/dashboard");
}

export async function deleteProfile(formData) {
  // ** GET THE DATA FROM THE FORM
  const profileId = formData.get("profileId");
  const profileType = formData.get("profileType"); // 'admin' || 'supervisor', 'nurse', or 'user'

  if (!profileId || !profileType) {
    // Handle case where data is missing
    return;
  }

  let collectionName;
  let redirectPath;

  switch (profileType) {
    case "supervisor":
      collectionName = "admin";
      redirectPath = "/admin/information/admins/show-admins";
      break;
    case "nurse":
      collectionName = "nurse";
      redirectPath = "/admin/information/nurses/show-nurses";
      break;
    case "user":
      collectionName = "users";
      redirectPath = "/admin/information/users/show-users";
      break;
    default:
      // Invalid profile type, do nothing.
      return;
  }

  const collection = await getCollection(collectionName);
  await collection.deleteOne({
    _id: ObjectId.createFromHexString(profileId),
  });

  // ** REVALIDATE AND REDIRECT
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function logout(params) {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
