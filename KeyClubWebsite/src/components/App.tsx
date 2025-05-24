import Header from "./Header"
import "../stylesheets/App.css"

import Home from "./Home"
import Footer, { currentSocials } from "./Footer";
import AboutUs from "./AboutUs";

function App() {

  return (
    <>
    <Header/>
    <AboutUs/>
    <Footer/>
    </>
  );
}

export default App
