import OpinionsHandlerMustache from "./opinionsHandlerMustache.js";
import ArticlesHandler from "./articlesHandler.js";
import CommentsHandler from "./commentsHandler.js";
import Router from "./paramHashRouter.js";
import Routes from "./routes.js";

window.SITE_TAG = "phones";
window.GOOGLE_OAUTH = "google-auth";

window.addEventListener("load", () => {
  window.router = new Router(Routes, "welcome");
  window.feedbacksHandler = new OpinionsHandlerMustache("optionTemplate");
  window.articlesHandler = new ArticlesHandler();
  window.commentsHandler = new CommentsHandler();

  const logOutButton = document.querySelector("#log-out-button");

  logOutButton.addEventListener("click", () => {
    localStorage.removeItem(window.GOOGLE_OAUTH);
    logOutButton.style.display = "none";

    google.accounts.id.renderButton(document.getElementById("google_auth_button"), { theme: "outline", size: "large" });
  });
});
