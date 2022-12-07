import DropdownMenuControl from "./dropdownMenuControl.js";
import OpinionsHandler from "./opinionsHandler.js";
import OpinionsHandlerMustache from "./opinionsHandlerMustache.js";

window.drMenuCntrl = new DropdownMenuControl("menuIts", "menuTitle", "mnShow");

// window.opnsHndlr = new OpinionsHandler("opnFrm", "opinionsContainer");
// window.opnsHndlr.init();

window.opnsHndlr = new OpinionsHandlerMustache("opnFrm", "opinionsContainer", "mTmplOneOpinion");
window.opnsHndlr.init();
