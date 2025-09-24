"use server";

import bcrypt from "bcrypt";
import { getCollection } from "@/lib/db";
import { RegisterFormSchema, LoginFormSchema, EditFormSchema } from "@/lib/rules";
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
    range: "admin",
  });

  // **CREATE A SESSION
  // await createSession(results.insertedId.toString());

  // **REDIRECT
  redirect("/admin/information/admins/show-admins");
}

export async function editAdmin(state, formData) {
  // **EXTRACT FORM FIELDS
  const id = formData.get("id");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const currentPassword = formData.get("currentPassword");

  // **VALIDATE FORM FIELDS
  const validatedFields = EditFormSchema.safeParse({
    firstName,
    lastName,
    email,
    password: password || undefined, // Hacemos la contraseña opcional en la validación
    confirmPassword: confirmPassword || undefined,
    currentPassword: currentPassword || undefined,
  });

  // **IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const adminCollection = await getCollection("admin");
  if (!adminCollection) return { errors: { form: "Error de servidor!" } };

  const updateData = {
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    email: validatedFields.data.email,
  };

  // **SI SE PROPORCIONA UNA NUEVA CONTRASEÑA, HASHEARLA Y AÑADIRLA
  if (validatedFields.data.password) {
    // Primero, buscar al admin para verificar su contraseña actual
    const admin = await adminCollection.findOne({ _id: ObjectId.createFromHexString(id) });
    if (!admin) {
      return { errors: { form: "Administrador no encontrado." } };
    }

    // Verificar que la contraseña actual es correcta
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedFields.data.currentPassword,
      admin.password
    );

    if (!isCurrentPasswordValid) {
      return {
        errors: { currentPassword: "La contraseña actual no es correcta." },
      };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    updateData.password = hashedPassword;
  }

  try {
    await adminCollection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updateData }
    );
  } catch (error) {
    return { errors: { form: "No se pudo actualizar el administrador." } };
  }

  revalidatePath("/admin/information/admins/show-admins");
  redirect("/admin/information/admins/show-admins");
}

export async function editNurse(state, formData) {
  // **EXTRACT FORM FIELDS
  const id = formData.get("id");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const currentPassword = formData.get("currentPassword");

  // **VALIDATE FORM FIELDS
  const validatedFields = EditFormSchema.safeParse({
    firstName,
    lastName,
    email,
    password: password || undefined, // Hacemos la contraseña opcional en la validación
    confirmPassword: confirmPassword || undefined,
    currentPassword: currentPassword || undefined,
  });

  // **IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const nurseCollection = await getCollection("nurse");
  if (!nurseCollection) return { errors: { form: "Error de servidor!" } };

  const updateData = {
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    email: validatedFields.data.email,
  };

  // **SI SE PROPORCIONA UNA NUEVA CONTRASEÑA, HASHEARLA Y AÑADIRLA
  if (validatedFields.data.password) {
    // Primero, buscar al admin para verificar su contraseña actual
    const nurse = await nurseCollection.findOne({ _id: ObjectId.createFromHexString(id) });
    if (!nurse) {
      return { errors: { form: "Enfermero/a no encontrado." } };
    }

    // Verificar que la contraseña actual es correcta
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedFields.data.currentPassword,
      nurse.password
    );

    if (!isCurrentPasswordValid) {
      return {
        errors: { currentPassword: "La contraseña actual no es correcta." },
      };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    updateData.password = hashedPassword;
  }

  try {
    await nurseCollection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updateData }
    );
  } catch (error) {
    return { errors: { form: "No se pudo actualizar el enfermero/a." } };
  }

  revalidatePath("/admin/information/nurses/show-nurses");
  redirect("/admin/information/nurses/show-nurses");
}

export async function editUser(state, formData) {
  // **EXTRACT FORM FIELDS
  const id = formData.get("id");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const currentPassword = formData.get("currentPassword");

  // **VALIDATE FORM FIELDS
  const validatedFields = EditFormSchema.safeParse({
    firstName,
    lastName,
    email,
    password: password || undefined, // Hacemos la contraseña opcional en la validación
    confirmPassword: confirmPassword || undefined,
    currentPassword: currentPassword || undefined,
  });

  // **IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { form: "Error de servidor!" } };

  const updateData = {
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    email: validatedFields.data.email,
  };

  // **SI SE PROPORCIONA UNA NUEVA CONTRASEÑA, HASHEARLA Y AÑADIRLA
  if (validatedFields.data.password) {
    // Primero, buscar al admin para verificar su contraseña actual
    const user = await userCollection.findOne({ _id: ObjectId.createFromHexString(id) });
    if (!user) {
      return { errors: { form: "Empleado/a no encontrado." } };
    }

    // Verificar que la contraseña actual es correcta
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedFields.data.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return {
        errors: { currentPassword: "La contraseña actual no es correcta." },
      };
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    updateData.password = hashedPassword;
  }

  try {
    await userCollection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updateData }
    );
  } catch (error) {
    return { errors: { form: "No se pudo actualizar el empleado/a." } };
  }

  revalidatePath("/admin/information/users/show-users");
  redirect("/admin/information/users/show-users");
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

export async function deleteProfile(formData) {
  // ** GET THE DATA FROM THE FORM
  const profileId = formData.get("profileId");
  const profileType = formData.get("profileType"); // 'admin', 'nurse', or 'user'

  if (!profileId || !profileType) {
    // Handle case where data is missing
    return;
  }

  let collectionName;
  let redirectPath;

  switch (profileType) {
    case 'admin':
      collectionName = 'admin';
      redirectPath = '/admin/information/admins/show-admins';
      break;
    case 'nurse':
      collectionName = 'nurse';
      redirectPath = '/admin/information/nurses/show-nurses';
      break;
    case 'user':
      collectionName = 'users';
      redirectPath = '/admin/information/users/show-users';
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
