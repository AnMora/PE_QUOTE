import FooterComponent from "../components/footer";
import LoginAdminComponent from "../components/loginAdmin";
import RegisterAdminComponent from "../components/registerAdmin";

export default function admin() {
  return (
    <div id="layoutAuthentication">
        <h1 className="text-center font-weight-light my-2">
          Administración
        </h1>
        <p className="text-center font-weight-light my-2">
          Administrador para cotizaciones  de urgencias Pediaclinic, para poder
          ingresar digite sus datos de administrador
        </p>
      <LoginAdminComponent />
      {/* <RegisterAdminComponent /> */}
      <FooterComponent />
    </div>
  );
}