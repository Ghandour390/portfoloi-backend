import NavBar from "../src/compennets/admin/navBar";


function homePage() {
  return (
    <div className="homePage">
      <NavBar />
      <div className="homePageContent">
        <h1 className="text-4xl font-bold">Home Page</h1>
      </div>
    </div>
  );
}

export default homePage;