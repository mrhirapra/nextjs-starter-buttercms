import Butter from "buttercms";

let butter;

const previewSetting = process.env.PREVIEW;
// make preview mode by default
const preview =
  previewSetting === "true" || previewSetting === undefined ? 1 : 0;

try {
  // Updated initialization with proper typing
  butter = Butter(process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY, { preview });
} catch (err) {
  console.log(err);
}

const defaultPageSize = 100;
const defaultPostCount = 10;

function getErrorMessage(err) {
  return err?.cause?.data?.detail || "Unexpected error occurred";
}

export async function getLandingPage(slug) {
  try {
    const page = await butter.page.retrieve("landing-page", slug);

    return page?.data?.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
}

export async function getLandingPages() {
  let paginatedLandingPages = [];
  let currentPage = 1;
  while (currentPage) {
    const landingPagesData = await getLandingPagesData(currentPage);
    paginatedLandingPages.push(...landingPagesData.pages);
    currentPage = landingPagesData.nextPage;
  }

  return paginatedLandingPages;
}

async function getLandingPagesData(page, pageSize = defaultPageSize) {
  try {
    const params = {
      page,
      page_size: pageSize,
    };
    const response = await butter.page.list("landing-page", params);

    return {
      nextPage: response?.data?.meta.next_page,
      pages: response?.data?.data,
      prevPage: response?.data?.meta.previous_page,
    };
  } catch (err) {
    throw getErrorMessage(err);
  }
}

export async function getPostsData(
  { category, page, pageSize, tag } = { page: 1, pageSize: defaultPostCount },
) {
  try {
    // https://buttercms.com/docs/api/node?javascript#get-your-blog-posts
    const params = {
      page: page || 1,
      page_size: pageSize || defaultPostCount,
    };

    if (tag) {
      params.tag_slug = tag;
    }

    if (category) {
      params.category_slug = category;
    }
    const response = await butter.post.list(params);

    return {
      nextPage: response?.data?.meta.next_page,
      posts: response?.data?.data,
      prevPage: response?.data?.meta.previous_page,
    };
  } catch (err) {
    throw getErrorMessage(err);
  }
}

export async function getPost(slug) {
  try {
    const response = await butter.post.retrieve(slug);

    return response?.data?.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
}

export async function getMainMenu() {
  try {
    const response = await butter.content.retrieve(["navigation_menu"]);

    const mainMenu = response?.data?.data?.navigation_menu.find(
      (menu) => menu.name == "Main menu",
    );

    return mainMenu ? mainMenu.menu_items : [];
  } catch (err) {
    throw getErrorMessage(err);
  }
}

export async function getCategories() {
  try {
    const response = await butter.category.list();

    return response?.data?.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
}

export async function getTags() {
  try {
    const response = await butter.tag.list();

    return response?.data?.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
}

export async function searchPosts({ query }) {
  try {
    const response = await butter.post.search(query);

    return response?.data?.data;
  } catch (err) {
    throw getErrorMessage(err);
  }
}
