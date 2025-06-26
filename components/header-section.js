import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import MainMenu from "./main-menu/main-menu";

export default function HeaderSection({ mainMenu }) {
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const navbarAreaEl = useRef(null);

  function fixNavBar() {
    if (navbarAreaEl.current) {
      setIsNavbarSticky(window.scrollY > navbarAreaEl.current.offsetTop);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", fixNavBar);

    return () => {
      window.removeEventListener("scroll", fixNavBar);
    };
  }, []);

  return (
    <header className="header">
      <div
        className={`navbar-area ${isNavbarSticky ? "sticky" : ""}`}
        ref={navbarAreaEl}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <a
                  className="navbar-brand"
                  href="/"
                >
                  <Image
                    alt="Logo"
                    height={45}
                    src="https://cdn.buttercms.com/PBral0NQGmmFzV0uG7Q6"
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                    }}
                    width={180}
                  />
                </a>
                <MainMenu mainMenuLinks={mainMenu} />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
