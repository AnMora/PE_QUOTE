import QuoteView from "../components/quoteView";
import { getCollection } from "@/lib/db";
export default async function Quotes(params) {
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
            <QuoteView inputs={simpleInputs} />
          </div>
        </main>
      </div>
    </>
  );
}
