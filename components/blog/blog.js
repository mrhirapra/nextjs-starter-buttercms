import Link from "next/link";

import PostPreviewCondensed from "./post-preview-condensed";

export default function Blog({ posts }) {
  return (
    <section
      className="blog-section"
      id="blog"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-10">
            <div className="section-title text-center">
              <h2>Latest Blog Posts</h2>
              <p>
                Butter also has a built in blog engine which makes it dead
                simple to launch a new company blog.
              </p>
              <p>
                <Link
                  className="main-btn btn-hover mt-5"
                  href={"/blog"}
                >
                  View All Blog Posts
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {posts.map((post) => (
            <PostPreviewCondensed
              author={post.author}
              coverImage={post.featuredImage}
              coverImageAlt={post.featuredImageAlt}
              date={post.published}
              excerpt={post.summary}
              key={post.slug}
              slug={post.slug}
              title={post.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
