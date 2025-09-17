"use client";

import Link from "next/link";

export default function ProfilesView({ profiles = [], profileType }) {
  // TODO: Implementar la lógica para eliminar un perfil.
  // Esto probablemente implicará llamar a una Server Action o una API route.
  const handleDelete = (profileId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar este ${profileType}?`)) {
      console.log(`Eliminar ${profileType} con ID:`, profileId);
      // Aquí iría la lógica de eliminación
    }
  };

  return (
    <div className="card border-success mt-2 mb-4">
      <div className="card-header">
        <i className="fas fa-table me-1"></i>
        Listado de {profileType === 'admin' ? 'Administradores' : 'Usuarios'}
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
                <td className="text-white">{profile.firstName} {profile.lastName}</td>
                <td className="text-white">{profile.email}</td>
                <td><span className="badge bg-success">{profile.range}</span></td>
                <td>
                  <Link href={`/admin/information/admins/update/${profile._id}`} className="btn btn-primary me-2">
                    {/* <i className="fas fa-edit me-1"></i>  */}
                    Modificar
                  </Link>
                  <button type="button" onClick={() => handleDelete(profile._id)} className="btn btn-warning">
                    {/* <i className="fas fa-trash me-1"></i>  */}
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}