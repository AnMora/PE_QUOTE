"use client"

import { useActionState } from "react";
import { loginAdmin } from "../actions/auth";
import Link from "next/link";

export default function LoginAdminComponent(params) {
  const [state, action, isPending] = useActionState(loginAdmin, undefined)

  // console.log(isPending);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container-fluid px-2">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg mt-2 mb-2">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-2">Login</h3>
                </div>
                <div className="card-body">
                  <form action={action}>
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
                      {state?.errors?.email && <p className="error">{state.errors.email}</p>}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputPassword"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <label htmlFor="inputPassword">Password</label>
                      {state?.errors?.password && <p className="error">{state.errors.password}</p>}
                    </div>
                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                      {/* <Link > */}
                        <button disabled={isPending} className="btn btn-primary">
                          {isPending ? "Loading..." : "Login"}
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
