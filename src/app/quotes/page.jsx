import getAuthUser from "@/lib/getAuthUser";
import QuoteView from "../components/quoteView";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Quotes(params) {
  const authUser = await getAuthUser();
  const authUserId = authUser.userId;
  const userCollection = await getCollection("users");
  
    const user =
      authUserId.length === 24
        ? await userCollection?.findOne({
            _id: ObjectId.createFromHexString(authUserId),
          })
        : null;
  
    const sanitizedUser = user
      ? {
          ...user,
          _id: user._id.toString(),
          password: undefined,
        }
      : null;

  const inputsCollection = await getCollection("inputs");
  const inputs = await inputsCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();

  const simpleInputs = inputs.map((input) => {
    const { _id, ...rest } = input;
    return { id: _id.toString(), ...rest };
  });
  
  return (
    <>
      <h1 className="mt-4">Cotizador Principal</h1>
      <p>
        Para realizar una cotización por favor complete los siguientes datos:
      </p>
      <div id="layoutAuthentication_content">
        <main>
          <div className="container-fluid px-2">
            <QuoteView inputs={simpleInputs} authUser={sanitizedUser} />
          </div>
        </main>
      </div>
    </>
  );
}
