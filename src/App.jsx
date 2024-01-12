import { HallOfFame, Header, Footer, Skills, Work } from "./container";
import { Navbar } from "./components";

import "./App.scss";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <HallOfFame />
      <Work />
      <Skills />
      {/* <Testimonial /> */}
      <Footer />
      <div id="backdrop" />
    </div>
  );
}
