import Header from "../otherComponents/All/Header"
import "../../stylesheets/App.css"
import Footer from "../otherComponents/All/Footer";
import { JSX, useEffect, useState } from "react";

import { routes, reverseRoutes } from "../otherComponents/All/Routes";

import { useSearchParams, useNavigate } from "react-router-dom";



function App() {

  //These allow the user to reload the page and stay on their desired page.
  //For example, if the user is on the Officer page and reloaded their screen, they would stay on the Officer page.
  const [params] = useSearchParams();
  const page = params.get("page")?.replace("%20"," ");

  const navigate = useNavigate();

  const [usePage, setPage] = useState(routes[page || "Home"]);

  useEffect(()=>{
    navigate(`?page=${reverseRoutes.get(usePage)}`);
  }, [usePage]);

  return (
    <>
    <Header changePage={setPage}/>
    {usePage}
    <Footer/>
    </>
  );
}



export default App
