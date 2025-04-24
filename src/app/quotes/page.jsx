import QuoteView from "../components/quoteView";
import { getCollection } from "@/lib/db";

export default async function Quotes(params) {
  const inputsCollection = await getCollection("Inputs");
  const inputs = await inputsCollection
    ?.find()
    .sort({ $natural: -1 })
    .toArray();
  
  return (
    <>
      <h1 className="mt-4">Cotizador Principal</h1>
      <p>Para realizar una cotización por favor complete los siguientes datos:</p>
      <div id="layoutAuthentication_content">
        <main>
        <div className="container-fluid px-2">
            <QuoteView inputs={inputs} />
          </div>
        </main>
      </div>
    </>
  );
}
