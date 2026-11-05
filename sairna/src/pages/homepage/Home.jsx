import CTA from "./components/CTA"
import Explore from "./components/Explore"
import Hero from "./components/Hero"
import SearchBox from "./components/SearchBox"
import Stats from "./components/Stats"

function Home() {
  return (
    <>
    <Hero/>
    <SearchBox />
    <Stats/>
    <Explore />
    <CTA/>
    </>
  )
}

export default Home
