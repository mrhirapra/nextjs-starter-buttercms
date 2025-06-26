import Image from "next/image";
import Link from "next/link";

export default function PostPreviewCondensed({
  coverImage,
  coverImageAlt,
  excerpt,
  slug,
  title,
}) {
  return (
    <div className="col-lg-4 col-md-8 col-sm-10">
      <div className="single-blog">
        {coverImage && (
          <div className="blog-header">
            <Image
              alt={coverImageAlt}
              fill
              sizes="100vw"
              src={coverImage}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <div className="blog-body">
          <h5 className="package-name">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h5>
          <p>{excerpt}</p>
        </div>
        <div className="blog-footer">
          <Link
            className="main-btn btn-hover"
            href={`/blog/${slug}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
