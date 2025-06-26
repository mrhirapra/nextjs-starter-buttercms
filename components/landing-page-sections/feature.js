import Image from "next/image";

export default function Feature({ description, headline, icon }) {
  return (
    <div className="col-lg-6 col-md-6">
      <div className="single-feature">
        <div className="feature-icon">
          {icon && (
            <Image
              alt=""
              fill
              sizes="100vw"
              src={icon}
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <div className="feature-content">
          <h4>{headline}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
