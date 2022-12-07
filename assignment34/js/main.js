import OpinionsHandlerMustache from "./opinionsHandlerMustache.js";

window.feedbacksHandler = new OpinionsHandlerMustache("feedbackForm", "renderContainer", "optionTemplate");
window.feedbacksHandler.init();
