import NavBar from "../src/compennets/admin/navBar";
import Login from "../src/compennets/admin/login";


export default function loginPage() {
  return (
    <div className="loginPage">
      <NavBar />
      <Login />
    </div>
  );
}