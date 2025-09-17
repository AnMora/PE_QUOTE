"use client";

import React, { useActionState } from "react";
import { loginNurse } from "../actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginNurseComponent(params) {
  const [state, action, isPending] = useActionState(loginNurse, undefined);
  const router = useRouter();

  React.useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state]);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card border-danger mt-2 mb-2">
                <div className="card-header">
                  <i className="fas fa-user fa-fw me-1"></i>
                  Enfermería Hospital Metropolitano
                </div>
                <div className="card-body">
                  <form action={action}>
                    <div className="form-floating mb-2">
                      <input
                        className="form-control border-info"
                        id="inputEmail"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        defaultValue={state?.email}
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
                    <div className="form-floating mb-2">
                      <input
                        className="form-control border-info"
                        id="inputPassword"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <label htmlFor="inputPassword">Contraseña</label>
                      {state?.errors?.password && (
                        <small
                          id="emailHelp"
                          className="form-text text-warning"
                        >
                          {state.errors.password}
                        </small>
                      )}
                    </div>
                    <div className="mt-2 mb-0">
                      <div className="d-grid">
                        <button
                          disabled={isPending}
                          className="btn btn-primary"
                        >
                          {isPending ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Iniciar sesión"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer bg-danger">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="pt-2">¿Eres de admisión?</p>
                    <Link className="nav-link" href="/">
                      <button className="btn btn-success">
                        Ir para admisión
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}