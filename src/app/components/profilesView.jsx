"use client";

import Link from "next/link";
import { deleteProfile } from "../actions/auth";

export default function ProfilesView({ profiles, profileType, editPath }) {
  return (
    <div className="card border-success mt-2 mb-4">
      <div className="card-header">
        <i className="fas fa-table me-1"></i>
        Listado de perfiles
      </div>
      <div className="card-body">
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rango</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile._id}>
                <td className="text-white">
                  {profile.firstName} {profile.lastName}
                </td>
                <td className="text-white">{profile.email}</td>
                <td>
                  <span className="badge bg-success">{profile.range}</span>
                </td>
                <td>
                  <div className="d-flex justify-content-start align-items-center">
                    <Link
                      href={`${editPath}/${profile._id}`}
                      className="btn btn-primary me-2"
                    >
                      {/* <i className="fas fa-edit me-1"></i>  */}
                      Modificar
                    </Link>
                    <form action={deleteProfile}>
                      <input
                        type="hidden"
                        name="profileId"
                        value={profile._id.toString()}
                      />
                      <input
                        type="hidden"
                        name="profileType"
                        value={profile.range} // 'admin', 'nurse', o 'user'
                      />
                      <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={(e) => {
                          if (
                            !window.confirm(
                              `¿Estás seguro de que quieres eliminar a ${profile.firstName} ${profile.lastName}?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
