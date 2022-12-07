const submit = document.querySelector("#sendFeedback");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const imageInput = document.querySelector("#image");
const radioButtons = document.querySelectorAll("input[name='user_type']");
const receiveEmailsCheckbox = document.querySelector("#receive_emails");
const messageInput = document.querySelector("#message");
const keywordInput = document.querySelector("#keyword");

const FEEDBACKS = "feedbacks";

export default class OpinionsHandler {
  constructor(opinionsFormElmId, opinionsListElmId) {
    this.opinions = [];

    this.opinionsElm = document.getElementById(opinionsListElmId);
    this.opinionsFrmElm = document.getElementById(opinionsFormElmId);

    console.log(this.opinionsElm, this.opinionsFrmElm);
  }

  init() {
    if (localStorage.getItem(FEEDBACKS)) {
      this.opinions = JSON.parse(localStorage.getItem(FEEDBACKS));
    }

    this.opinionsElm.innerHTML = this.opinionArray2html(this.opinions);
    this.opinionsFrmElm.addEventListener("submit", (event) => this.processOpnFrmData(event));
  }

  processOpnFrmData(event) {
    event.preventDefault();

    if (!this.opinionsFrmElm.checkValidity()) {
      alert("Form is not valid!");
      return;
    }

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const imageValue = imageInput.value.trim();

    let radioValue;
    for (const button of radioButtons) if (button.checked) radioValue = button.value;

    const receiveEmailsValue = receiveEmailsCheckbox.checked;
    const messageValue = messageInput.value.trim();
    const keywordValue = keywordInput.value.trim();

    const newOpinion = {
      nameValue,
      emailValue,
      imageValue,
      radioValue,
      receiveEmailsValue: receiveEmailsValue ? "I am agree to receive emails." : "I don't want to receive emails.",
      messageValue,
      keywordValue,
      created: new Date().toDateString(),
    };

    this.opinions.push(newOpinion);

    localStorage.setItem(FEEDBACKS, JSON.stringify(this.opinions));

    this.opinionsElm.innerHTML += this.opinion2html(newOpinion);

    this.opinionsFrmElm.reset();
    alert("New feedback was successfully added to your list! Open console to see it!");
  }

  opinion2html(opinion) {
    const opinionTemplate = `
    	<section>
    	   <h3>${opinion.nameValue} <i>(${opinion.created})</i></h3>
    	   <p><i>Email: ${opinion.emailValue}</i></p>
    	   <p>keywords: ${opinion.keywordValue}</p>
    	   <p>Message: ${opinion.messageValue}</p>
    	   <p>Is user new: ${opinion.radioValue}</p>
    	   <p>${opinion.receiveEmailsValue}</p>
         <img src="${imageValue}" />
    	</section>`;

    return opinionTemplate;
  }

  opinionArray2html(sourceData) {
    return sourceData.reduce((htmlWithOpinions, opn) => htmlWithOpinions + this.opinion2html(opn), "");
  }
}
