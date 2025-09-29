"use client";

import { useActionState } from "react";
import { createInput } from "../actions/posts";

// NO SE PUEDE PROBAR EL CREAR INSUMOS HASTA QUE SE PUEDA BUSCAR, MODIFICAR Y ELIMINAR
// CREAR UPDATE-INPUTS

export default function RegisterInputsComponent(params) {
  const [state, action, isPending] = useActionState(createInput, undefined);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-dark mt-2 mb-2">
                <div className="card-header">
                  <i className="fas fa-user fa-fw me-1"></i>
                  Crear insumo Hospital Metropolitano
                </div>
                <form action={action}>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputNumeroDelArticulo"
                            type="text"
                            name="numeroDelArticulo"
                            placeholder="Numero del Articulo"
                            defaultValue={state?.numeroDelArticulo}
                          />
                          <label htmlFor="inputNumeroDelArticulo">
                            Numero del Articulo
                          </label>
                          {state?.errors?.numeroDelArticulo && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                El numero del articulo debe:
                              </p>
                              <ul className="small text-warning">
                                {state.errors.numeroDelArticulo.map((err) => (
                                  <li key={err}>{err}</li>
                                ))}
                              </ul>
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputdescripcionDelArticulo"
                            type="text"
                            name="descripcionDelArticulo"
                            placeholder="Descripcion del articulo"
                            defaultValue={state?.descripcionDelArticulo}
                          />
                          <label htmlFor="inputdescripcionDelArticulo">
                            Descripción del Articulo
                          </label>
                          {state?.errors?.descripcionDelArticulo && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                La descrición del articulo debe:
                              </p>
                              <ul className="small text-warning">
                                {state.errors.descripcionDelArticulo.map((err) => (
                                  <li key={err}>{err}</li>
                                ))}
                              </ul>
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Segunda fila de campos*/}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputCategoria"
                            type="text"
                            name="Categoria"
                            placeholder="Categoria"
                            defaultValue={state?.Categoria}
                          />
                          <label htmlFor="inputCategoria">Categoria</label>
                          {state?.errors?.Categoria && (
                            <small
                              id="inputCategoria"
                              className="form-text text-warning"
                            >
                              {state.errors.Categoria}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputPac_Int_CCSS"
                            type="text"
                            name="Pac_Int_CCSS"
                            placeholder="Pac_Int_CCSS"
                            defaultValue={state?.Pac_Int_CCSS}
                          />
                          <label htmlFor="inputPac_Int_CCSS">Costo Paciente Interno CCSS</label>
                          {state?.errors?.Pac_Int_CCSS && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                El costo paciente interno CCSS debe:
                              </p>
                              <ul className="small text-warning">
                                {state.errors.Pac_Int_CCSS.map((err) => (
                                  <li key={err}>{err}</li>
                                ))}
                              </ul>
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Tercera fila de campos*/}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputpacExtCOL"
                            type="text"
                            name="pacExtCOL"
                            placeholder="Costo paciente Externo COLONES"
                            defaultValue={state?.pacExtCOL}
                          />
                          <label htmlFor="inputpacExtCOL">
                            Costo paciente Externo COLONES
                          </label>
                          {state?.errors?.pacExtCOL && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                El costo paciente Externo COLONES debe:
                              </p>
                              <ul className="small text-warning">
                                {state.errors.pacExtCOL.map((err) => (
                                  <li key={err}>{err}</li>
                                ))}
                              </ul>
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputpacIntCOL"
                            type="text"
                            name="pacIntCOL"
                            placeholder="Costo paciente Interno COLONES"
                            defaultValue={state?.pacIntCOL}
                          />
                          <label htmlFor="inputpacIntCOL">
                            Costo paciente Interno COLONES
                          </label>
                          {state?.errors?.pacIntCOL && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                El costo paciente Interno COLONES debe:
                              </p>
                              <ul className="small text-warning">
                                {state.errors.pacIntCOL.map((err) => (
                                  <li key={err}>{err}</li>
                                ))}
                              </ul>
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Cuarta fila de campos*/}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputpacExtDOL"
                            type="text"
                            name="pacExtDOL"
                            placeholder="Costo paciente Externo DOLARES"
                            defaultValue={state?.pacExtDOL}
                          />
                          <label htmlFor="inputpacExtDOL">
                            Costo paciente Externo DOLARES
                          </label>
                          {state?.errors?.pacExtDOL && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                El costo paciente Externo DOLARES debe:
                              </p>
                              <ul className="small text-warning">
                                {state.errors.pacExtDOL.map((err) => (
                                  <li key={err}>{err}</li>
                                ))}
                              </ul>
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputpacIntDOL"
                            type="text"
                            name="pacIntDOL"
                            placeholder="Costo paciente Interno DOLARES"
                            defaultValue={state?.pacIntDOL}
                          />
                          <label htmlFor="inputpacIntDOL">
                            Costo paciente Interno DOLARES
                          </label>
                          {state?.errors?.pacIntDOL && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                El costo paciente Interno DOLARES debe:
                              </p>
                              <ul className="small text-warning">
                                {state.errors.pacIntDOL.map((err) => (
                                  <li key={err}>{err}</li>
                                ))}
                              </ul>
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-end">
                    <button
                      disabled={isPending}
                      className="btn btn-primary btn-block"
                    >
                      {isPending ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Crear Insumo"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
