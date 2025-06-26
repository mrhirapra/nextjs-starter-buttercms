import Image from "next/image";

export default function Hero({
  buttonLabel,
  buttonUrl,
  headline,
  image,
  scrollAnchorId,
  subheadline,
}) {
  return (
    <section
      className="hero-section"
      id={scrollAnchorId}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="hero-content">
              <h1>{headline}</h1>
              <p>{subheadline}</p>

              <a
                className="main-btn btn-hover"
                href={buttonUrl}
              >
                {buttonLabel}
              </a>
              <a href="https://buttercms.com/join/">Need an account?</a>
            </div>
          </div>
          {image && (
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="hero-image text-center text-lg-end">
                <Image
                  alt=""
                  height={400}
                  sizes="100vw"
                  src={image}
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                  width={400}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
