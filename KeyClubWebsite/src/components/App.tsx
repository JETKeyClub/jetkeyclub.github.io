import Header from "./Header"
import "../stylesheets/App.css"

import Home from "./Home"
import SuspenseImage from "./SuspenseImage/SuspenseImage";
import testImage from "../assets/cat.jpg";
import { Suspense } from "react";
function App() {

  return (
    <>
    <Header/>
    <Home/>
    </>
  );
}

export default App
