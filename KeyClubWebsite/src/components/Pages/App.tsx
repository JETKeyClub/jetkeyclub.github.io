import { JSX, useEffect, useState } from "react";
import { Helmet, HelmetData } from "react-helmet";
import { useSearchParams, useNavigate } from "react-router-dom";

import Header from "../otherComponents/All/Header"
import "../../stylesheets/App.css"
import Footer from "../otherComponents/All/Footer";
import { routes, reverseRoutes } from "../otherComponents/All/Routes";
import logo from "../../assets/KeyClubLogo.webp"


function App() {

  //These allow the user to reload the page and stay on their desired page.
  //For example, if the user is on the Officer page and reloaded their screen, they would stay on the Officer page.
  const [params] = useSearchParams();
  const page = params.get("page")?.replace("%20"," ") || "Home";

  const navigate = useNavigate();

  const [pageName, setPageName] = useState<string>(page);
  const [usePage, setPage] = useState(routes[page]);


  useEffect(()=>{
    navigate(`?page=${reverseRoutes.get(usePage)}`);
    setPageName(reverseRoutes.get(usePage) || "Home");
  }, [usePage]);

  useEffect(()=>{
    document.title = `THS Key Club - ${pageName}`
  }, [pageName])

  return (
    <>
    <Helmet>
      <title>{`THS Key Club - ${pageName}`}</title>
      <metadata name="description">{`Welcome to the THS Key Club ${pageName} page!`}</metadata>
      <metadata name="og:title">{`THS Key Club`}</metadata>
      <metadata name="og:description">{`Welcome to the THS Key Club Website!`}</metadata>
      <metadata name="og:image">{logo}</metadata>
    </Helmet>
    <Header changePage={setPage}/>
    {usePage}
    <Footer/>
    </>
  );
}



export default App
