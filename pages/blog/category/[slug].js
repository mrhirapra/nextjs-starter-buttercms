import camelcaseKeys from "camelcase-keys";

import Link from "next/link";

import { getCategories, getPostsData } from "@/lib/api";

import CategoriesWidget from "@/components/blog/categories-widget";
import PostsList from "@/components/blog/posts-list";
import SearchWidget from "@/components/blog/search-widget";

export default function Category({ categories, posts, slug }) {
  return (
    <>
      <section
        className="blog-roll-nav"
        id="blog-roll"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h2>Blog Posts by Category</h2>
                <ul className="breadcrumb-nav">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>Category: {slug}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-posts">
        <div className="container">
          <div className="row justify-content-center">
            <PostsList posts={posts || []} />
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

export async function getStaticProps({ params: { slug } }) {
  try {
    // const blogPosts = (await getPostsData({ category: slug })).posts;
    // const categories = await getCategories();
    // TODO: test
    const [blogPosts, categories] = await Promise.all([
      getPostsData({ category: slug }),
      getCategories(),
    ]);

    return {
      props: { categories, posts: camelcaseKeys(blogPosts.posts), slug },
      revalidate: 1,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const butterToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;

  if (butterToken) {
    try {
      const categories = await getCategories();

      return {
        fallback: true,
        paths: categories.map((category) => `/blog/category/${category.slug}`),
      };
    } catch (e) {
      console.error("Couldn't load categories.", e);

      return {
        fallback: false,
        paths: [],
      };
    }
  }

  return {
    fallback: false,
    paths: [],
  };
}
