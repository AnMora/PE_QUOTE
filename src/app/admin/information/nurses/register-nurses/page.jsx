import RegisterNurseComponent from "@/app/components/registerNurse";
import UsersList from "@/app/components/usersList";

export default function registerNurse(params) {
    return (
        <>
            <h1 className="mt-4">Registro de Enfermería</h1>
            <ol className="breadcrumb">
                <li className="breadcrumb-item active">
                    Para registrar un enfermero/a por favor complete los siguientes datos:
                </li>
            </ol>
            <main>
                <RegisterNurseComponent />
                {/* <UsersList /> */}
            </main>
        </>
    )
}