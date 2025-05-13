import RegisterAdminComponent from "@/app/components/registerAdmin";

export default function registerAdmin(params) {
    return (
        <>
            <h1 className="mt-4">Registrar Nuevo Administrador</h1>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    Para registrar un administrador por favor complete los siguientes datos:
                </li>
            </ol>
            <main>
                <RegisterAdminComponent />
            </main>
        </>
    )
}