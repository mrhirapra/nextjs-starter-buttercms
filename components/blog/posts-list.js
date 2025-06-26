import PostsPreview from "./post-preview";

export default function PostsList({ posts }) {
  return (
    <div className="col-12 col-lg-8 blog-roll-cards">
      <div className="row">
        {posts.map((post) => (
          <PostsPreview
            author={post.author}
            coverImage={post.featuredImage}
            coverImageAlt={post.featuredImageAlt}
            date={post.published}
            excerpt={post.summary}
            key={post.slug}
            slug={post.slug}
            tags={post.tags}
            title={post.title}
          />
        ))}
        {!posts.length && <div>No blog posts found.</div>}
      </div>
    </div>
  );
}
