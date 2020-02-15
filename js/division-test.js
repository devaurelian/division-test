import { LitElement, html, css, unsafeCSS } from 'https://unpkg.com/lit-element?module';
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map?module';

import * as Utils from '/js/utils.js';

class DivisionTest extends LitElement {

  static get properties() {
    return {
      dividend: { type: Number },
      divisor: { type: Number },
      quotient: { type: Number },
      correct: { type: Boolean }
    }
  }

  static get styles() {
    return css`
      .test {
        color: #212529;
        font-family: 'Dokdo', cursive;
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      @media (min-width: 768px) {
        .test {
          font-size: 4rem;
        }
      }

      .test[data-correct='true'] {
        color: green;
      }

      .test[data-correct='false'] {
        color: red;
      }

      input {
        background-color: inherit;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
      }

      input[type=number]::-webkit-inner-spin-button, 
      input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
      }

      .quotient-input {
        appearance: none;
        border: none;
        outline: none;
        width: 7rem;
      }

      [data-correct='false'] .quotient-input {
        text-decoration: line-through;
      }

      .quotient {
        display: none;
      }

      [data-correct='false'] .quotient {
        display: inline-block;
      }
    `;
  }

  constructor() {
    super();

    this.divisor = Utils.getRandomIntInclusive(1, 10);
    this.quotient = Utils.getRandomIntInclusive(1, 10);
    this.dividend = this.divisor * this.quotient;
  }

  render() {
    return html`
      <div class="test" data-correct=${this.correct} style="border-color: ${Utils.randomColor()}">
        <output class="dividend">${this.dividend}</output>
        :
        <output class="divisor">${this.divisor}</output>
        =
        <input id="quotient" class="quotient-input" type="number" placeholder="?" @keydown=${this.keyDownHandler}>
        <output class="quotient">(${this.quotient})</output>
      </div> 
        `;
  }

  checkAnswer() {
    const quotientInput = this.shadowRoot.getElementById("quotient");

    if (!quotientInput.value) return;

    this.correct = quotientInput.value == this.quotient;
    quotientInput.readOnly = true;

    let event = new CustomEvent('answered', {
      detail: {
        correct: this.correct
      }
    });
    this.dispatchEvent(event);
  }

  keyDownHandler(event) {
    if (event.code == 'Enter') {
      this.checkAnswer();
    }

  }

  firstUpdated(changedProperties) {
    const quotientInput = this.shadowRoot.getElementById('quotient');
    quotientInput.focus();
  }

}

customElements.define('division-test', DivisionTest);