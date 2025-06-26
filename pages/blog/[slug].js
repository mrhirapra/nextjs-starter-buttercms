import camelcaseKeys from "camelcase-keys";

import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { getCategories, getPost, getPostsData } from "@/lib/api";

import { useRouter } from "next/router";

import AuthorCard from "@/components/author-card";
import CategoriesWidget from "@/components/blog/categories-widget";
import HumanDate from "@/components/human-date";
import Preloader from "@/components/preloader";
import SearchWidget from "@/components/blog/search-widget";

export default function BlogPost({ categories, post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Preloader />;
  }

  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          content="ie=edge"
          httpEquiv="x-ua-compatible"
        />
        <title>{post.seoTitle}</title>
        <meta
          content={post.metaDescription}
          name="description"
        />
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        />
        <link
          href="https://buttercms.com/static/v2/images/favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />

        <meta
          content="website"
          property="og:type"
        />
        <meta
          content={post.url}
          property="og:url"
        />
        <meta
          content={post.seoTitle}
          property="og:title"
        />
        <meta
          content={post.featuredImage}
          property="og:image"
        />
        <meta
          content={post.metaDescription}
          property="og:description"
        />
        <meta
          content="@ButterCMS"
          name="twitter:site"
        />
        <meta
          content="@ButterCMS"
          name="twitter:creator"
        />
        <meta
          content="ButterCMS Blog"
          name="twitter:title"
        />
        <meta
          content={post.metaDescription}
          name="twitter:description"
        />
      </Head>
      <section
        className="single-post-nav"
        id="blog-header"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>{post.title}</h2>
                <ul className="breadcrumb-nav">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>{post.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-post">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-12 col-12">
              <div className="single-post">
                <div className="single-post-meta">
                  <h2 className="single-post-header">{post.title}</h2>
                  <ul className="single-post-meta-info">
                    <li>
                      <AuthorCard author={post.author} />
                    </li>
                    <li>
                      <a>
                        <i className="lni lni-calendar"></i>{" "}
                        <HumanDate dateString={post.published} />
                      </a>
                    </li>
                    {post.tags.map((tag) => (
                      <li key={tag.slug}>
                        <Link href={`/blog/tag/${tag.slug}`}>
                          <i className="lni lni-tag"></i> {tag.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {post.featuredImage && (
                  <div className="single-post-thumbnail">
                    <Image
                      alt={post.featuredImageAlt}
                      fill
                      sizes="100vw"
                      src={post.featuredImage}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div
                  className="single-post-body prose"
                  dangerouslySetInnerHTML={{ __html: post.body }}
                ></div>
              </div>
            </div>

            <aside className="col-12 col-lg-4">
              <SearchWidget />
              <CategoriesWidget categories={categories || []} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    const [post, categories] = await Promise.all([
      getPost(params.slug),
      getCategories(),
    ]);
    return { props: { categories, post: camelcaseKeys(post) } };
  } catch (e) {
    console.error("Couldn't load post or categories data.", e);

    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const butterToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;

  if (butterToken) {
    try {
      const posts = (await getPostsData()).posts;

      return {
        fallback: true,
        paths: posts.map((post) => `/blog/${post.slug}`),
      };
    } catch (e) {
      console.error("Couldn't load posts.", e);
    }
  }

  return {
    fallback: false,
    paths: [],
  };
}
