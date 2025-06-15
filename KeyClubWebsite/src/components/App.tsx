import Header from "./Header"
import "../stylesheets/App.css"

import Home from "./Home"
import Footer, { currentSocials } from "./Footer";
import AboutUs from "./AboutUs";
import { JSX, useState } from "react";

function App() {

  const [usePage, setPage] = useState(<Home/>)

  return (
    <>
    <Header changePage={setPage}/>
    {usePage}
    <Footer/>
    </>
  );
}

export default App
