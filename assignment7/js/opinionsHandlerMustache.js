import OpinionsHandler from "./opinionsHandler.js";

export default class OpinionsHandlerMustache extends OpinionsHandler {
  constructor(templateElmId) {
    super();
    this.mustacheTemplate = document.getElementById(templateElmId).innerHTML;
  }

  opinion2html(opinion) {
    return Mustache.render(this.mustacheTemplate, opinion);
  }
}
