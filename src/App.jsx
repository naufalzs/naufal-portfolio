import { About, Header, Footer, Skills, Testimonial, Work } from "./container";
import { Navbar } from "./components";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
}
