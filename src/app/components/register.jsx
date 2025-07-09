"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "../actions/auth";

export default function RegisterComponent(params) {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-dark mt-2 mb-2">
                <div className="card-header text-success">
                  <i className="fas fa-user fa-fw me-1"></i>
                  Crear empleado Hospital Metropolitano
                </div>
                <div className="card-body">
                  <form action={action}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control"
                            id="inputFirstName"
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            defaultValue={state?.firstName}
                          />
                          <label htmlFor="inputFirstName">Nombre</label>
                          {state?.errors?.firstName && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              {state.errors.firstName}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            className="form-control"
                            id="inputLastName"
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            defaultValue={state?.lastName}
                          />
                          <label htmlFor="inputLastName">Apellidos</label>
                          {state?.errors?.lastName && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              {state.errors.lastName}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputEmail"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        defaultValue={state?.email}
                      />
                      <label htmlFor="inputEmail">Correo Electrónico</label>
                      {state?.errors?.email && (
                        <small id="emailHelp" className="form-text text-warning">
                          {state.errors.email}
                        </small>
                      )}
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                          />
                          <label htmlFor="inputPassword">Contraseña</label>
                          {state?.errors?.password && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
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
                            className="form-control"
                            id="inputPasswordConfirm"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                          />
                          <label htmlFor="inputPasswordConfirm">
                            Confirmar Contraseña
                          </label>
                          {state?.errors?.confirmPassword && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
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
                          className="btn btn-outline-primary btn-block"
                        >
                          {isPending ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : "Crear cuenta"}
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
