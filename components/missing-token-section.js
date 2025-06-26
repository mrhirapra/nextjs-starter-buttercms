import Image from "next/image";

export default function MissingTokenSection() {
  return (
    <section
      className="hero-section"
      id="home"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="hero-content">
              <h1>Configure your ButterCMS API Token</h1>
              <p>
                Please add your API token to <code>.env</code> file as{" "}
                <code>NEXT_PUBLIC_BUTTER_CMS_API_KEY</code>.
              </p>
              <a
                className="main-btn btn-hover"
                href="https://buttercms.com/join/"
                rel="noreferrer"
                target="_blank"
              >
                Get your free API token
              </a>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <Image
              alt=""
              height={300}
              src="https://cdn.buttercms.com/9bPtzdJ6QSWkySNjlmyR"
              style={{
                height: "auto",
                maxWidth: "100%",
              }}
              width={300}
            />
            <div className="hero-image text-center text-lg-end"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
