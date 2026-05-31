import Carosuel from "../Component/Carosuel"
import Features from "../Component/Features"
import MidBanner from "../Component/MidBanner"

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
    <Carosuel/>  
    <MidBanner/>
    <Features/>
    </div>
  )
}

export default Home