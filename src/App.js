import React, { useState } from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { gsap } from "gsap";
import "./App.scss";

import About from "./pages/about";
import Header from "./components/header";
import Home from "./pages/home";
import Contacts from "./pages/contacts";
import Showcase from "./pages/showcase";
import Work from "./pages/work";
import Experience from "./pages/experience";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/about", name: "About", Component: About },
  { path: "/contacts", name: "Contacts", Component: Contacts },
  { path: "/showcase", name: "Showcase", Component: Showcase },
  { path: "/work", name: "Work", Component: Work },
  { path: "/experience", name: "Experience", Component: Experience },
];

function App() {
  const onEnter = (node) => {
    gsap.from(
      [node.children[0].firstElementChild, node.children[0].lastElementChild],
      0.6,
      {
        y: 30,
        delay: 0.6,
        ease: "power3.InOut",
        opacity: 0,
        stagger: {
          amount: 0.6,
        },
      }
    );
  };

  const onExit = (node) => {
    gsap.to(
      [node.children[0].firstElementChild, node.children[0].lastElementChild],
      0.6,
      {
        y: -30,
        ease: "power3.InOut",
        stagger: {
          amount: 0.2,
        },
      }
    );
  };

  return (
    <>
      <div>
        <Header />
        <div className="containerr relative">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={1200}
                  classNames="page"
                  onExit={onExit}
                  onEntering={onEnter}
                  unmountOnExit
                >
                  <>
                    <Component />
                    <div className="skryta-absolute"></div>
                  </>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
