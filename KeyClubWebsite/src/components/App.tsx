import Header from "./Header"
import "../stylesheets/App.css"

import Home from "./Home"
import { Suspense } from "react"

function App() {

  return <Suspense fallback={<h1> Loading </h1>}>
    <Header/>
    <Home/>
  </Suspense>
}

export default App
