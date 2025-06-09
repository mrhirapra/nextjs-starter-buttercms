import Image from "next/image";

export default function Custom404() {
  console.error(
    "Your Butter token might be set to an invalid value. Please verify your token is correct."
  );

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="hero-content">
              <h1>404 Page not found</h1>
              <p>
                Check that your API token is correct or that the requested URL
                is valid.
              </p>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <Image
              src="https://cdn.buttercms.com/9bPtzdJ6QSWkySNjlmyR"
              alt="Logo"
              width={180}
              height={45}
              style={{
                maxWidth: "300px",
                height: "auto",
              }}
            />
            <div className="hero-image text-center text-lg-end"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
