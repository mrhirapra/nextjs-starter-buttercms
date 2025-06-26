import { useEffect, useRef, useState } from "react";

import MainMenuLink from "./main-menu-link";

export default function ManiMenu({ mainMenuLinks }) {
  const [activeMenuLink, setActiveMenuLink] = useState(
    mainMenuLinks.length ? mainMenuLinks[0].url : "",
  );

  function highlightLinks() {
    const sections = document.querySelectorAll(".page-scroll");
    const scrollPos =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    sections.forEach((currLink) => {
      const val = currLink.getAttribute("href").slice(1);
      if (val[0] !== "#") {
        return;
      }
      const refElement = document.querySelector(val);

      if (!refElement) {
        return;
      }

      const scrollTopMinus = scrollPos + 73;

      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        setActiveMenuLink(val);
      }
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", highlightLinks);

    return () => {
      window.removeEventListener("scroll", highlightLinks);
    };
  }, []);

  const [isMenuActive, setMenuActive] = useState(false);
  const menuLinksEl = useRef(null);

  function inactivateMenu() {
    setMenuActive(false);
    if (menuLinksEl.current) {
      menuLinksEl.current.classList.remove("show");
    }
  }

  return (
    <>
      <button
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className={`navbar-toggler ${isMenuActive ? "active" : ""}`}
        data-bs-target="#navbarSupportedContent"
        data-bs-toggle="collapse"
        onClick={() => setMenuActive(!isMenuActive)}
        type="button"
      >
        <span className="toggler-icon"></span>
        <span className="toggler-icon"></span>
        <span className="toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse sub-menu-bar"
        id="navbarSupportedContent"
        ref={menuLinksEl}
      >
        <div className="ms-auto">
          <ul
            className="navbar-nav ms-auto"
            id="nav"
          >
            {mainMenuLinks.map((navLink) => (
              <MainMenuLink
                active={navLink.url === activeMenuLink}
                callbackOnClick={inactivateMenu}
                key={navLink.url}
                label={navLink.label}
                url={navLink.url}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
