export default (targetElm, id, articlePage, forEdit = false) => {
  const apiUrl = new URL(`${TUKE_API}/api/article/${id}`);

  fetch(apiUrl)
    .then((data) => data.json())
    .then((data) => {
      if (forEdit) {
        const template = document.querySelector("#article-input-template").innerHTML;

        document.getElementById(targetElm).innerHTML = Mustache.render(template, {
          ...data,
          backLink: `#article/${id}/${articlePage}`,
          submitBtTitle: "Update article",
        });

        setTimeout(() => window.articlesHandler.setFormObserver("articleForm", id, articlePage));
      } else {
        const template = document.querySelector("#article-template").innerHTML;

        document.getElementById(targetElm).innerHTML = Mustache.render(template, {
          ...data,
          backLink: `#articles/${articlePage}`,
          articleEditLink: `#articleEdit/${id}/${articlePage}`,
          articleDeleteLink: `#articleDelete/${id}/${articlePage}`,
        });
      }
    });
};
