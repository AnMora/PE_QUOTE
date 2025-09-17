"use client";

import { useActionState } from "react";
import { updateAdmin } from "../actions/auth"; // Necesitarás crear esta Server Action

export default function UpdateAdminComponent({ admin }) {
  // Pasamos el ID del admin a la acción del servidor
  const updateAdminWithId = updateAdmin.bind(null, admin._id);
  const [state, action, isPending] = useActionState(updateAdminWithId, undefined);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-dark mt-2 mb-2">
                <div className="card-header">
                  <i className="fas fa-user-edit fa-fw me-1"></i>
                  Actualizar datos de: {admin.firstName} {admin.lastName}
                </div>
                <div className="card-body">
                  <form action={action}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputFirstName"
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            defaultValue={state?.firstName ?? admin.firstName}
                          />
                          <label htmlFor="inputFirstName">Nombre</label>
                          {state?.errors?.firstName && (
                            <small className="form-text text-warning">
                              {state.errors.firstName}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            className="form-control border-info"
                            id="inputLastName"
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            defaultValue={state?.lastName ?? admin.lastName}
                          />
                          <label htmlFor="inputLastName">Apellidos</label>
                          {state?.errors?.lastName && (
                            <small className="form-text text-warning">
                              {state.errors.lastName}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control border-info"
                        id="inputEmail"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        defaultValue={state?.email ?? admin.email}
                      />
                      <label htmlFor="inputEmail">Correo Electrónico</label>
                      {state?.errors?.email && (
                        <small className="form-text text-warning">
                          {state.errors.email}
                        </small>
                      )}
                    </div>
                    <p className="small text-muted">Deje los campos de contraseña en blanco si no desea cambiarla.</p>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputPassword"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                          />
                          <label htmlFor="inputPassword">Nueva Contraseña</label>
                          {state?.errors?.password && (
                            <small className="form-text text-warning">
                              <p className="text-warning">La contraseña debe:</p>
                              <ul className="small text-warning">
                                {state.errors.password.map((err) => (
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
                            id="inputPasswordConfirm"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                          />
                          <label htmlFor="inputPasswordConfirm">
                            Confirmar Nueva Contraseña
                          </label>
                          {state?.errors?.confirmPassword && (
                            <small className="form-text text-warning">
                              {state.errors.confirmPassword}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mb-0">
                      <div className="d-grid">
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
                          ) : "Actualizar Cuenta"}
                        </button>
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
