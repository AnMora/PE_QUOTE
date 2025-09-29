"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { InputFormSchema, SuggestionFormSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

async function genericCreateSuggestion(state, formData, userType) {
  // ** CHECK IF USER IS SIGNED IN
  const user = await getAuthUser();
  if (!user.userId) return redirect("/");

  // ** VALIDATE FORM FIELDS
  const validatedFields = SuggestionFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // ** IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title: formData.get("title"),
      description: formData.get("description"),
    };
  }

  const collectionName = userType === "nurse" ? "nurse" : "users";
  const redirectPath =
    userType === "nurse" ? "/nurse/suggestions" : "/suggestions";

  // ** CHECK IF USER EXISTS IN THE DATABASE
  const userCollection = await getCollection(collectionName);
  if (!userCollection) return { errors: { form: "Server error!" } };

  // ** FIND USER IN DATABASE
  const dbUser = await userCollection.findOne({
    _id: ObjectId.createFromHexString(user.userId),
  });
  if (!dbUser) return { errors: { user: "User not found!" } };

  // ** SAVE THE NEW SUGGESTION IN DB
  try {
    const suggestionCollection = await getCollection("suggestions");
    const suggestion = {
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      userId: dbUser._id,
      userFirstName: dbUser.firstName,
      userLastName: dbUser.lastName,
    };
    await suggestionCollection.insertOne(suggestion);
  } catch (error) {
    return { errors: { title: error.message } };
  }

  // ** REDIRECT
  redirect(redirectPath);
}

export async function createPost(state, formData) {
  return genericCreateSuggestion(state, formData, "user");
}

export async function createNursePost(state, formData) {
  return genericCreateSuggestion(state, formData, "nurse");
}

export async function createInput(state, formData) {
  // ** CHECK IF USER IS ADMIN (o rol permitido)
  const user = await getAuthUser();
  // Aquí deberías tener una lógica para verificar el rol del usuario.
  // Por ahora, solo verificamos que esté logueado.
  if (!user.userId) return redirect("/");

  // ** VALIDATE FORM FIELDS
  const validatedFields = InputFormSchema.safeParse({
    numeroDelArticulo: formData.get("numeroDelArticulo"),
    descripcionDelArticulo: formData.get("descripcionDelArticulo"),
    Categoria: formData.get("Categoria"),
    Pac_Int_CCSS: formData.get("Pac_Int_CCSS"),
    pacExtCOL: formData.get("pacExtCOL"),
    pacIntCOL: formData.get("pacIntCOL"),
    pacExtDOL: formData.get("pacExtDOL"),
    pacIntDOL: formData.get("pacIntDOL"),
  });

  // ** IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // ** SAVE THE NEW INPUT IN DB
  try {
    const inputsCollection = await getCollection("inputs");
    await inputsCollection.insertOne(validatedFields.data);
  } catch (error) {
    return {
      errors: { form: `Error al crear el insumo: ${error.message}` },
    };
  }

  // ** REVALIDATE AND REDIRECT
  // revalidatePath('/admin/inputs'); // o la ruta que corresponda
  redirect("/admin/inputs/show-inputs"); // o la ruta que corresponda
}

export async function editInput(state, formData) {
  console.log("Editar un insumo");
}

async function genericEditSuggestion(state, formData, userType) {
  // ** CHECK IF USER IS SIGNED IN
  const user = await getAuthUser();
  if (!user.userId) return redirect("/");

  // ** VALIDATE FORM FIELDS
  const suggestionId = formData.get("suggestionId");
  const validatedFields = SuggestionFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // ** IF ANY FORM FIELDS ARE INVALID
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title: formData.get("title"),
      description: formData.get("description"),
    };
  }

  const redirectPath =
    userType === "nurse" ? "/nurse/suggestions" : "/suggestions";

  // ** FIND THE POST THAT WE WANT UPDATE
  const suggestionCollection = await getCollection("suggestions");
  const suggestion = await suggestionCollection.findOne({
    _id: ObjectId.createFromHexString(suggestionId),
  });

  if (!suggestion) return redirect(redirectPath);

  // ** CHECK THE AUTH USER OWNS THE POST
  if (user.userId !== suggestion.userId.toString()) redirect(redirectPath);

  // ** UPDATE THE POST IN DB
  await suggestionCollection.findOneAndUpdate(
    { _id: suggestion._id },
    {
      $set: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
      },
    }
  );

  // ** REDIRECT
  redirect(redirectPath);
}

export async function editPost(state, formData) {
  return genericEditSuggestion(state, formData, "user");
}

export async function editNursePost(state, formData) {
  return genericEditSuggestion(state, formData, "nurse");
}

async function genericDeleteSuggestion(formData, userType) {
  // ** CHECK IF USER IS SIGNED IN
  const user = await getAuthUser();
  if (!user.userId) return redirect("/");

  // ** GET THE ID FORM FIELD
  const suggestionId = formData.get("suggestionId");
  const redirectPath =
    userType === "nurse" ? "/nurse/suggestions" : "/suggestions";

  // ** FIND THE POST
  const suggestionCollection = await getCollection("suggestions");
  const suggestion = await suggestionCollection.findOne({
    _id: ObjectId.createFromHexString(suggestionId),
  });

  if (!suggestion) return redirect(redirectPath);

  // ** CHECK THE AUTH USER OWNS THE POST
  if (user.userId !== suggestion.userId.toString()) redirect(redirectPath);

  // ** DELETE THE POST
  await suggestionCollection.findOneAndDelete({ _id: suggestion._id });

  // ** REDIRECT
  redirect(redirectPath);
}

export async function deletePost(formData) {
  return genericDeleteSuggestion(formData, "user");
}

export async function deleteNursePost(formData) {
  return genericDeleteSuggestion(formData, "nurse");
}
