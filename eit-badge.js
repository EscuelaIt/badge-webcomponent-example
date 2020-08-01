import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

class EitBadge  extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        position: relative;
      }
      .badge {
        position: absolute;
        right: 2px;
        top: -15px;
      }
      span {
        position: absolute;
        left: 0;
        min-width: 14px;
        min-height: 14px;
        border-radius: 14px;
        padding: 3px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: var(--eit-badge-default-background-color, red);
        white-space: nowrap;
      } 
      span.neutral {
        background-color: var(--eit-badge-neutral-background-color, blue);
      }
      span.success {
        background-color: var(--eit-badge-success-background-color, green);
      }
      span.big {
        left: 3px;
        min-width: 18px;
        min-height: 18px;
        border-radius: 18px;
        padding: 5px;
        font-size: 16px;
      }
      span.square {
        left: 3px;
        border-radius: 1px !important;
      }
    `;
  }

  static get properties() {
    return {
      value: { type: String },
      status: { type: String },
      _classes: { type: Object },
    };
  }

  render() {
    return html`
      <slot></slot>
      <div class="badge">
        <span class="${classMap(this._classes)}">
          ${this.value}
        </span>
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('status')) {
      this.generateClasses(this.status);
    }
  }

  generateClasses(status) {
    let classes = {};
    let statusValues = status.split('-');
    let avaliableClasses = ['neutral', 'success', 'big', 'square'];
    for(let currentClass of avaliableClasses) {
      if(statusValues.indexOf(currentClass) == -1) {
        classes[currentClass] = false;
      } else {
        classes[currentClass] = true;
      }
    }
    this._classes = classes;
  }
}

customElements.define('eit-badge', EitBadge);