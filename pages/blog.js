import camelcaseKeys from "camelcase-keys";

import Link from "next/link";

import { getCategories, getPostsData } from "@/lib/api";

import CategoriesWidget from "@/components/blog/categories-widget";
import PostsList from "@/components/blog/posts-list";
import SearchWidget from "@/components/blog/search-widget";

export default function Blog({ categories, posts }) {
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
                <h2>All Blog Posts</h2>
                <ul className="breadcrumb-nav">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>All blog posts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-posts">
        <div className="container">
          <div className="row justify-content-center">
            <PostsList posts={posts} />
            <aside className="col-12 col-lg-4">
              <SearchWidget />
              <CategoriesWidget categories={categories} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const butterToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;

  if (butterToken) {
    try {
      const [blogPosts, categories] = await Promise.all([
        getPostsData(),
        getCategories(),
      ]);
      return { props: { categories, posts: camelcaseKeys(blogPosts.posts) } };
    } catch (e) {
      console.log("Could not get posts", e);

      return {
        props: { categories: [], posts: [] },
      };
    }
  }

  return { props: { categories: [], posts: [] } };
}
