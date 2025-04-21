import "../stylesheets/Home.css"
import HomeBanner from "../assets/homeBanner.jpg"

export default function Home() {
    return <div className="Page">
        <div className="Banner">
            <img src={HomeBanner}/>
        </div>
    </div>
}