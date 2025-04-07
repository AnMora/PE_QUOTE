import LoginAdminComponent from "../components/loginadmin";
import RegisterAdminComponent from "../components/registerAdmin";

export default function admin({ params }) {
  return (
    <div id="layoutAuthentication">
        <h1 className="text-center font-weight-light my-2">
          Administracion
        </h1>
        <p className="text-center font-weight-light my-2">
          Administrador para cotizaciones  de urgencias Pediaclinic, para poder
          ingresar digite sus datos de administrador
        </p>
      <RegisterAdminComponent />
      {/* <LoginAdminComponent /> */}
    </div>
  );
}