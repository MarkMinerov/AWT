import OpinionsHandlerMustache from "./opinionsHandlerMustache.js";
import ArticlesHandler from "./articlesHandler.js";
import CommentsHandler from "./commentsHandler.js";
import Router from "./paramHashRouter.js";
import Routes from "./routes.js";

window.router = new Router(Routes, "welcome");
window.feedbacksHandler = new OpinionsHandlerMustache("optionTemplate");
window.articlesHandler = new ArticlesHandler();
window.commentsHandler = new CommentsHandler();
window.SITE_TAG = "phones";
