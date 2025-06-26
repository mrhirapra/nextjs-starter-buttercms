import Image from "next/image";
import Link from "next/link";

export default function TwoColumnWithImage({
  buttonLabel,
  buttonUrl,
  headline,
  image,
  imagePosition,
  scrollAnchorId,
  subheadline,
}) {
  return (
    <section
      className="cta-section"
      id={scrollAnchorId}
    >
      <div className="container">
        <div className="row">
          {image && imagePosition === "left" && (
            <div className="col-lg-6 order-last order-lg-first">
              <div className="left-image cta-image ">
                <Image
                  alt=""
                  height={400}
                  sizes="100vw"
                  src={image}
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                  width={600}
                />
              </div>
            </div>
          )}
          <div className="col-lg-6">
            <div className="cta-content-wrapper">
              <div className="section-title">
                <h2 className="mb-20">{headline}</h2>
                <div dangerouslySetInnerHTML={{ __html: subheadline }} />
              </div>
              <Link
                className="main-btn btn-hover border-btn mt-30"
                href={buttonUrl}
              >
                {buttonLabel}
              </Link>
            </div>
          </div>
          {image && imagePosition === "right" && (
            <div className="col-lg-6">
              <div className="right-image cta-image text-lg-end">
                <Image
                  alt=""
                  height={400}
                  sizes="100vw"
                  src={image}
                  style={{
                    height: "auto",
                    width: "100%",
                  }}
                  width={600}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
