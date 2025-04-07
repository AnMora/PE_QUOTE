import { createPost } from "@/app/actions/posts";
import SuggestionFormComponent from "@/app/components/SuggestionForm";

export default async function createSuggestion(params) {
    return (
        <>
            <h1 className="mt-4">Crear Sugerencia</h1>
            <SuggestionFormComponent handler={createPost}/>
        </>
    )
}