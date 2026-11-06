import CTA from "./components/CTA"
import Explore from "./components/Explore"
import Hero from "./components/Hero"
import MapSection from "./components/MapSection"
import SearchBox from "./components/SearchBox"
import Stats from "./components/Stats"
import Steps from "./components/Steps"

function Home() {
  return (
    <>
    <Hero/>
    <SearchBox />
    <Stats/>
    <Explore />
    <Steps/>
    <MapSection/>
    <CTA/>
    </>
  )
}

export default Home
