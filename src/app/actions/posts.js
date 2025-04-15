"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { SuggestionFormSchema } from "@/lib/rules";
import { errors } from "jose";
import { ObjectId } from "mongodb";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { redirect } from "next/navigation";

export async function createPost(state, formData) {
  // ** CHECK IF USER IS SIGNED IN
  const user = await getAuthUser();
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

  // ** CHECK IF USER EXISTS IN THE DATABASE
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server error!" } };

  // ** FIND USER IN DATABASE
  const dbUser = await userCollection.findOne({
    _id: ObjectId.createFromHexString(user.userId),
  });
  if (!dbUser) return { errors: { user: "User not found!" } };

  // ** SAVE THE NEW POST IN DB
  try {
    const suggestionCollection = await getCollection("suggestions");
    const suggestion = {
      title: validateFields.data.title,
      description: validateFields.data.description,
      userId: ObjectId.createFromHexString(user.userId),
      userId: dbUser._id,
      userName: dbUser.firstName,
      userLastName: dbUser.lastName,
    };
    await suggestionCollection.insertOne(suggestion);
  } catch (error) {
    return {
      errors: {
        title: error.message,
      },
    };
  }

  // ** REDIRECT
  redirect("/suggestions");
}

export async function editPost(state, formData) {
  // ** CHECK IF USER IS SIGNED IN
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // console.log(formData.get("suggestionId"));

  // ** VALIDATE FORM FIELDS
  const title = formData.get("title");
  const description = formData.get("description");
  const suggestionid = formData.get("suggestionId");

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

  // ** FIND THE POST THAT WE WANT UPDATE
  const suggestionCollection = await getCollection("suggestions");
  const suggestion = await suggestionCollection.findOne({
    _id: ObjectId.createFromHexString(suggestionid),
  });

  // ** CHECK THE USER OWNS THE POST
  if (user.userId !== suggestion.userId.toString()) redirect("/suggestions");

  // ** UPDATE THE POST IN DB
  suggestionCollection.findOneAndUpdate(
    { _id: suggestion._id },
    {
      $set: {
        title: validateFields.data.title,
        description: validateFields.data.description,
      },
    }
  );

  // ** REDIRECT
  redirect("/suggestions");
}
