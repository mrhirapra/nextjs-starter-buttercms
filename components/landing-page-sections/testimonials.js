import { useEffect } from "react";

import Testimonial from "./testimonial";

export default function Testimonials({
  headline,
  scrollAnchorId,
  testimonial: testimonials,
}) {
  useEffect(() => {
    import("tiny-slider").then(({ tns }) => {
      tns({
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000,
        container: ".testimonial-active",
        controls: true,
        controlsText: [
          '<i class="lni lni-chevron-left"></i>',
          '<i class="lni lni-chevron-right"></i>',
        ],
        gutter: 0,
        items: 1,
        mouseDrag: true,
        nav: false,
        navPosition: "bottom",
      });
    });
  });

  return (
    <section
      className="testimonial-section mt-100"
      id={scrollAnchorId}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div className="testimonial-active-wrapper">
              <div className="section-title text-center">
                <h2 className="mb-20">{headline}</h2>
              </div>

              <div className="testimonial-active">
                {testimonials.map((testimonial, index) => (
                  <Testimonial
                    key={index}
                    name={testimonial.name}
                    quote={testimonial.quote}
                    title={testimonial.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
