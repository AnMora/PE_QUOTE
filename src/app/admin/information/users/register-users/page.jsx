import RegisterComponent from "@/app/components/register";
import UsersList from "@/app/components/usersList";

export default function registerUser(params) {
    return (
        <>
            <h1 className="mt-4">Registro de Empleados</h1>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    Para registrar un empleado por favor complete los siguientes datos:
                </li>
            </ol>
            <main>
                <RegisterComponent />
                {/* <UsersList /> */}
            </main>
        </>
    )
}