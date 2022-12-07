const FEEDBACKS = "feedbacks";

export default class OpinionsHandler {
  constructor() {
    this.opinions = [];
  }

  loadOpinions() {
    if (localStorage.getItem(FEEDBACKS)) {
      this.opinions = JSON.parse(localStorage.getItem(FEEDBACKS));
    }
  }

  setFormObserver(opinionsFormElmId) {
    document.getElementById(opinionsFormElmId).addEventListener("submit", (event) => this.processOpnFrmData(event));
  }

  processOpnFrmData(event) {
    const form = event.srcElement;
    const submit = document.querySelector("#sendFeedback");
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const imageInput = document.querySelector("#image");
    const radioButtons = document.querySelectorAll("input[name='user_type']");
    const receiveEmailsCheckbox = document.querySelector("#receive_emails");
    const messageInput = document.querySelector("#message");
    const keywordInput = document.querySelector("#keyword");

    event.preventDefault();

    if (!form.checkValidity()) {
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

    form.reset();
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
