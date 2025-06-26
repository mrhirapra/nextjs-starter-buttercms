import camelcaseKeys from "camelcase-keys";

import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

import { getLandingPage, getLandingPages, getPostsData } from "@/lib/api";

import Blog from "@/components/blog/blog";
import LandingPageSection from "@/components/landing-page-sections/landing-page-section";
import Preloader from "@/components/preloader";

export default function LandingPage({ blogPosts, page }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Preloader />;
  }

  if (!page) {
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
        <title>{page.fields.seo.title}</title>
        <meta
          content={page.fields.seo.description}
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
      </Head>

      {page.fields.body.map(({ fields: sectionData, type }, index) => (
        <LandingPageSection
          key={index}
          sectionData={sectionData}
          type={type}
        />
      ))}
      <Blog posts={blogPosts} />
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    const page = await getLandingPage(params.slug);
    const blogPosts = (await getPostsData({ page: 1, pageSize: 2 })).posts;

    return {
      props: { blogPosts: camelcaseKeys(blogPosts), page: camelcaseKeys(page) },
    };
  } catch (e) {
    console.error(`Couldn't load content for Landing page ${params.slug}.`, e);

    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const butterToken = process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY;

  if (butterToken) {
    try {
      const landingPages = await getLandingPages();

      return {
        fallback: true,
        paths: landingPages.map((page) => `/landing-page/${page.slug}`),
      };
    } catch (e) {
      console.error("Couldn't load content for Landing pages.", e);
    }

    return {
      fallback: "blocking",
      paths: [],
    };
  }
}
