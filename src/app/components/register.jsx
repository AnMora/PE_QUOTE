"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "../actions/auth";

export default function RegisterComponent(params) {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card shadow-lg border-0 rounded-lg mt-2 mb-2">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-2">
                    Create Account
                  </h3>
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
                          <label htmlFor="inputFirstName">First name</label>
                          {state?.errors?.firstName && (
                            <small
                              id="emailHelp"
                              className="form-text text-white"
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
                          <label htmlFor="inputLastName">Last name</label>
                          {state?.errors?.lastName && (
                            <small
                              id="emailHelp"
                              className="form-text text-white"
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
                      <label htmlFor="inputEmail">Email address</label>
                      {state?.errors?.email && (
                        <small id="emailHelp" className="form-text text-white">
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
                          <label htmlFor="inputPassword">Password</label>
                          {state?.errors?.password && (
                            <small
                              id="emailHelp"
                              className="form-text text-white"
                            >
                              <p className="text-white">Password must:</p>
                              <ul className="small text-white">
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
                            Confirm Password
                          </label>
                          {state?.errors?.confirmPassword && (
                            <small
                              id="emailHelp"
                              className="form-text text-white"
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
                          className="btn btn-primary btn-block"
                          href="login.html"
                        >
                          {isPending ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : "Create Account"}
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
