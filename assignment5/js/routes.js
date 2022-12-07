const TUKE_API = "https://wt.kpi.fei.tuke.sk";
const POSTS_PER_PAGE = 20;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default [
  {
    hash: "welcome",
    target: "router-view",
    getTemplate: (targetElm) => (document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML),
  },

  {
    hash: "articles",
    target: "router-view",
    getTemplate(targetElm, currentPage = 1) {
      currentPage = parseInt(currentPage);

      document.getElementById(targetElm).innerHTML = document.getElementById("template-articles").innerHTML;

      const apiUrl = new URL(`${TUKE_API}/api/article`);
      apiUrl.searchParams.append("offset", (currentPage - 1) * POSTS_PER_PAGE);
      apiUrl.searchParams.append("max", POSTS_PER_PAGE);

      fetch(apiUrl.href)
        .then((response) => response.json())
        .then((data) => {
          const articles = data.articles;
          const template = document.querySelector("#mustache-articles-template").innerHTML;
          const maxPages = Math.ceil(data.meta.totalCount / POSTS_PER_PAGE);

          document.querySelector("#articles-render-container").innerHTML = Mustache.render(template, {
            articles,
            currentPage,
            maxPages,
            prevPage: currentPage - 1 < 0 ? null : currentPage - 1,
            nextPage: currentPage + 1 > maxPages ? null : currentPage + 1,
          });
        });
    },
  },

  {
    hash: "opinions",
    target: "router-view",
    getTemplate(targetElm, currentPage = 1) {
      currentPage = parseInt(currentPage);
      window.feedbacksHandler.loadOpinions();

      const maxPages = Math.ceil(window.feedbacksHandler.opinions.length / POSTS_PER_PAGE);

      currentPage = clamp(currentPage, 1, maxPages);
      const currentData = window.feedbacksHandler.opinions.slice((currentPage - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE * currentPage);

      document.getElementById(targetElm).innerHTML = Mustache.render(document.getElementById("template-opinions").innerHTML, {
        prevPage: currentPage - 1 < 0 ? null : currentPage - 1,
        nextPage: currentPage + 1 > maxPages ? null : currentPage + 1,
        currentPage,
        maxPages,
      });
      document.querySelector("#renderContainer").innerHTML = window.feedbacksHandler.opinionArray2html(currentData);
    },
  },

  {
    hash: "addOpinion",
    target: "router-view",
    getTemplate(targetElm) {
      document.getElementById(targetElm).innerHTML = document.getElementById("template-add-opinions").innerHTML;
      window.feedbacksHandler.setFormObserver("feedbackForm");
    },
  },
];
