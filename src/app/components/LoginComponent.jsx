"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginComponent({
  loginAction,
  title,
  borderColor,
  footerConfig,
}) {
  const [state, action, isPending] = useActionState(loginAction, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container px-2">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className={`card ${borderColor} mt-2 mb-2`}>
                <div className="card-header">
                  <i className="fas fa-user fa-fw me-1"></i>
                  {title}
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
                          id="passwordHelp"
                          className="form-text text-warning"
                        >
                          {state.errors.password}
                        </small>
                      )}
                    </div>
                    <div className="mt-2 mb-0">
                      <div className="d-grid">
                        <button disabled={isPending} className="btn btn-primary">
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
                {footerConfig && (
                  <div className={`card-footer ${footerConfig.bgColor}`}>
                    <div className="d-flex align-items-center justify-content-between">
                      <p className="pt-2">{footerConfig.text}</p>
                      <Link className="nav-link" href={footerConfig.href}>
                        <button className={`btn ${footerConfig.buttonClass}`}>
                          {footerConfig.buttonText}
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}