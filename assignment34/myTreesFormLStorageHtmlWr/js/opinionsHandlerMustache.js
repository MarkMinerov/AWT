import OpinionsHandler from "./opinionsHandler.js";
import Mustache from "./mustache.js";

export default class OpinionsHandlerMustache extends OpinionsHandler {
  constructor(opinionsFormElmId, opinionsListElmId, templateElmId) {
    super(opinionsFormElmId, opinionsListElmId);
    this.mustacheTemplate = document.getElementById(templateElmId).innerHTML;
  }

  opinion2html(opinion) {
    const opinionView = {
      name: opinion.name,
      comment: opinion.comment,
      createdDate: new Date(opinion.created).toDateString(),
      willReturnMessage: opinion.willReturn ? "I will return to this page." : "Sorry, one visit was enough.",
    };

    return Mustache.render(this.mustacheTemplate, opinionView);
  }
}
