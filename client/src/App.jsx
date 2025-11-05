
import Login from "./compennets/admin/login"
import NavBar from "./compennets/admin/navBar"
// import Profile from "./compennets/admin/profile"
// import Register from "./compennets/admin/register"


function App() {


  return (
    <div className="App bg-[#231942] min-h-screen text-white flex flex-col items-center justify-center">
      <NavBar />
      <Login />
       {/* <Profile  /> */}
    </div>
  )
}

export default App
