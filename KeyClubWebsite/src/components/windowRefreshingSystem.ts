import { JSX } from "react";
import { routes } from "./Header";

function getLastPage(): JSX.Element {
    const time: number = Number.parseInt(window.localStorage.getItem("time") || "10")

    if(new Date().getTime() - time > 10) return routes["Home"]

    const title: string = window.localStorage.getItem("page") || "Home"
    return routes[title];
}

function setLastPage(page: JSX.Element) {
    
}