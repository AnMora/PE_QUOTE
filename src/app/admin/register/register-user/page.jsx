import RegisterComponent from "@/app/components/register";

export default function registerUser(params) {
    return (
        <>
            <h1 className="mt-4">Registrar Nuevo Usuario</h1>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    Para registrar un usuario por favor complete los siguientes datos:
                </li>
            </ol>
            <main>
                <RegisterComponent />
            </main>
        </>
    )
}