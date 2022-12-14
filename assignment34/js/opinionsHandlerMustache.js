import OpinionsHandler from "./opinionsHandler.js";
import Mustache from "./mustache.js";

export default class OpinionsHandlerMustache extends OpinionsHandler {
  constructor(opinionsFormElmId, opinionsListElmId, templateElmId) {
    super(opinionsFormElmId, opinionsListElmId);
    this.mustacheTemplate = document.getElementById(templateElmId).innerHTML;
  }

  opinion2html(opinion) {
    return Mustache.render(this.mustacheTemplate, opinion);
  }
}
