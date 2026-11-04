import CTA from "./components/CTA";
import SearchBox from "./components/SearchBox";
import Stats from "./components/Stats";

function Home() {
 return (
    <div className="min-h-screen bg-bg-main">
        <SearchBox/>
        <Stats />
        <CTA />
    </div>
 )   
}
export default Home;