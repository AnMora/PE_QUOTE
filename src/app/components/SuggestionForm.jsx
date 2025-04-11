"use client";

import { useActionState } from "react";

export default function SuggestionFormComponent({ handler, suggestion }) {
  const [state, action, isPending] = useActionState(handler, undefined);

  return (
    <div className="card-body">
      <form action={action}>
        <input
          type="hidden"
          name="suggestionId"
          defaultValue={suggestion?._id}
        />
        <div className="form-floating mb-3">
          <input
            className="form-control"
            id="inputTitle"
            type="text"
            name="title"
            placeholder="Sugerencias"
            defaultValue={state?.title || suggestion?.title}
          />
          <label htmlFor="title">Sugerencia o comentario</label>
          {state?.errors?.title && (
            <p className="error">{state.errors.title}</p>
          )}
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="inputTitle"
            type="text"
            name="description"
            placeholder="Descripcion"
            style={{ height: "200px" }}
            defaultValue={state?.description || suggestion?.description}
          ></textarea>
          <label htmlFor="description">Descripción</label>
          {state?.errors?.description && (
            <p className="error">{state.errors.description}</p>
          )}
        </div>
        <div className="mt-4 mb-0">
          <div className="d-grid">
            <button disabled={isPending} className="btn btn-primary">
              {isPending ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Aceptar"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
