import renderArticleComments from "./renderArticleComments.js";

export default class CommentsHandler {
  constructor() {
    this.addCallback = null;
  }

  setFormObserver(formElemId, id, articlePage) {
    const form = document.getElementById(formElemId);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const author = form.elements.namedItem("login").value.trim();
      const text = form.elements.namedItem("message").value.trim();
      let apiUrl = new URL(`${TUKE_API}/api/article/${id}/comment`);

      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ text, author }),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }).then(() => {
        if (this.addCallback) this.addCallback();
      });
    });
  }

  bindAddCallback(callback) {
    this.addCallback = callback;
  }

  resetData() {
    for (const key of Object.keys(this)) this[key] = null;
  }
}
