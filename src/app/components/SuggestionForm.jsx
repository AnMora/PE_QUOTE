"use client";

import { useActionState } from "react";

export default function SuggestionFormComponent({ handler }) {
  const [state, action, isPending] = useActionState(handler, undefined);
  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container-fluid px-2">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg mt-2 mb-2">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-2">
                    Sugerencias
                  </h3>
                </div>
                <div className="card-body">
                  <form action={action}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputTitle"
                        type="text"
                        name="title"
                        placeholder="Sugerencias"
                        defaultValue={state?.title}
                      />
                      <label htmlFor="title">Sugerencia</label>
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
                        style={{height: "200px"}}
                        defaultValue={state?.description}
                      ></textarea>
                      <label htmlFor="description">Descripcion</label>
                      {state?.errors?.description && (
                        <p className="error">{state.errors.description}</p>
                      )}
                    </div>
                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                      {/* <Link > */}
                        <button disabled={isPending} className="btn btn-primary">
                          {isPending ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : "Submit"}
                        </button>
                      {/* </Link> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
