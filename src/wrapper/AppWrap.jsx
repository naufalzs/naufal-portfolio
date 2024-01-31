import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (Component, idName, classNames = "") =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />

        <section className="app__wrapper app__flex">
          <Component />

          <footer className="copyright">
            <p className="p-text">@2023 Naufal</p>
            <p className="p-text">All rights reserved</p>
          </footer>
        </section>

        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
