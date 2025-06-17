import { JSX } from "react";

import Home from "./Home";
import AboutUs from "./AboutUs";
import Officers from "./Officers";

const routes : {[name: string]: JSX.Element} = {
    "Home" : <Home/>,
    "About Us" : <AboutUs/>,
    "Officers" : <Officers/>
};

const reverseRoutes : Map<JSX.Element, string> = new Map<JSX.Element, string>();
for(const [name, route] of Object.entries(routes))
    reverseRoutes.set(route,name)

export {routes, reverseRoutes}