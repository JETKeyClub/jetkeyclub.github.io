import Header from "./Header"
import "../stylesheets/App.css"
import Footer, { currentSocials } from "./Footer";
import { JSX, useEffect, useState } from "react";

import { routes, reverseRoutes } from "./Routes";

import { useSearchParams, useNavigate } from "react-router-dom";



function App() {

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
