"use client";

import { useActionState } from "react";
import { editAdmin } from "../actions/auth";
import Link from "next/link";

export default function UpdateAdminComponent({ admin }) {
  const [state, action, isPending] = useActionState(editAdmin, undefined);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-dark mt-2 mb-2">
                <div className="card-header">
                  <i className="fas fa-user-edit fa-fw me-1"></i>
                  Editar Administrador
                </div>
                <form action={action}>
                  <div className="card-body">
                    <input type="hidden" name="id" defaultValue={admin._id} />
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputFirstName"
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            defaultValue={admin.firstName}
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
                            className="form-control border-info"
                            id="inputLastName"
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            defaultValue={admin.lastName}
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
                        className="form-control border-info"
                        id="inputEmail"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        defaultValue={admin.email}
                      />
                      <label htmlFor="inputEmail">Correo Electrónico</label>
                      {state?.errors?.email && (
                        <small
                          id="emailHelp"
                          className="form-text text-warning"
                        >
                          {state.errors.email}
                        </small>
                      )}
                    </div>
                    {/* Campo para la contraseña actual */}
                    <div className="form-floating mb-3">
                      <input
                        className="form-control border-warning"
                        id="inputCurrentPassword"
                        type="password"
                        name="currentPassword"
                        placeholder="Contraseña actual"
                      />
                      <label htmlFor="inputCurrentPassword">
                        Contraseña Actual (requerida si cambia la contraseña)
                      </label>
                      {state?.errors?.currentPassword && (
                        <small
                          id="currentPasswordHelp"
                          className="form-text text-danger"
                        >
                          {state.errors.currentPassword}
                        </small>
                      )}
                    </div>

                    {/* Opcional: Campos para cambiar contraseña */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3 mb-md-0">
                          <input
                            className="form-control border-info"
                            id="inputPassword"
                            type="password"
                            name="password"
                            placeholder="Nueva contraseña (opcional)"
                          />
                          <label htmlFor="inputPassword">
                            Nueva Contraseña
                          </label>
                          {state?.errors?.password && (
                            <small
                              id="emailHelp"
                              className="form-text text-warning"
                            >
                              <p className="text-warning">
                                La contraseña debe:
                              </p>
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
                            placeholder="Confirmar nueva contraseña"
                          />
                          <label htmlFor="inputPasswordConfirm">
                            Confirmar Contraseña
                          </label>
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
                        "Actualizar"
                      )}
                    </button>
                    <Link href="/admin/information/admins/show-admins">
                      <button className="btn btn-danger m-1">Volver</button>
                    </Link>
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
