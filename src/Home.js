import FeatureProduct from "./components/FeatureProduct";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import { AppContext, AppProvider } from "./context/productcontext";


const Home = () => {
  const data = {
    name: "SINGH JII STORE",
  };

  return(
  <>
  <HeroSection myData={data} />;
  <FeatureProduct/>
  <Services/>
  <Trusted/>
  </>
  );
   
  
};

export default Home;