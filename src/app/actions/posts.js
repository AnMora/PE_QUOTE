"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { SuggestionFormSchema } from "@/lib/rules";
import { errors } from "jose";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createPost(state, formData) {
  // ** CHECK IF USER IS SIGNED IN
  const user = await getAuthUser();
  //   console.log(user);
  //   return;

  if (!user) return redirect("/");

  // ** VALIDATE FORM FIELDS
  const title = formData.get("title");
  const description = formData.get("description");

  const validateFields = SuggestionFormSchema.safeParse({
    title,
    description,
  });

  // ** IF ANY FORM FIELDS ARE INVALID
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      title,
      description,
    };
  }

  // ** SAVE THE NEW POST IN DB
  try {
    const suggestionCollection = await getCollection("suggestions");
    const suggestion = {
      title: validateFields.data.title,
      description: validateFields.data.description,
      userId: ObjectId.createFromHexString(user.userId),
    };
    await suggestionCollection.insertOne(suggestion);
  } catch (error) {
    return {
      errors: {
        title: error.message,
      },
    };
  }

  redirect("/suggestions");
}
