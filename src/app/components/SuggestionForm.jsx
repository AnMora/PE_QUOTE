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
            <small className="form-text text-warning">{state.errors.title}</small>
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
            <small className="form-text text-warning">{state.errors.description}</small>
          )}
        </div>
        <div className="mt-4 mb-0">
          <div className="d-grid">
            <button disabled={isPending} className="btn btn-outline-primary">
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
