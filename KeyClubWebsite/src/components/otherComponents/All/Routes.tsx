import { JSX } from "react";

import Home from "../../Pages/Home";
import AboutUs from "../../Pages/AboutUs";
import Officers from "../../Pages/Officers";

//All the different pages on the website
const routes : {[name: string]: JSX.Element} = {
    "Home" : <Home/>,
    "About Us" : <AboutUs/>,
    "Officers" : <Officers/>
};

//Page -> Page Name
const reverseRoutes : Map<JSX.Element, string> = new Map<JSX.Element, string>();
for(const [name, route] of Object.entries(routes))
    reverseRoutes.set(route,name)

export {routes, reverseRoutes}