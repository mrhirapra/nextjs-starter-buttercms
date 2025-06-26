import Feature from "./feature";

export default function Features({
  features,
  headline,
  scrollAnchorId,
  subheadline,
}) {
  return (
    <section
      className="feature-section"
      id={scrollAnchorId}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-10">
            <div className="section-title mb-60">
              <h2 className="mb-20">{headline}</h2>
              <p>{subheadline}</p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row">
              {features.map((feature, index) => (
                <Feature
                  description={feature.description}
                  headline={feature.headline}
                  icon={feature.icon}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
