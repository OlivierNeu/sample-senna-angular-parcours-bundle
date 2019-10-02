'use strict';

if (window.customElements.get('fwd-portail-btn-next') === undefined) {

    class FwdPortailBtnNext extends HTMLElement {

        static get is() {
            return 'fwd-portail-btn-next'
        }

        constructor() {
            super();

            // DOM elements
            this._btnNext = null;
            // data
            this._defaultLabel = 'sample.next';
        }

        connectedCallback() {
            console.log('fwd-portail-btn-next connected');
            this.innerHTML = `
            <style>
            </style>
            <button id="btn-next" class="btn btn-primary" type="button"></button>
        `;

            this._btnNext = document.querySelector('#btn-next');
            this._btnNext.addEventListener('click', event => {
                console.log('click');

                window.top.postMessage({
                    event_id: 'navigation',
                    data: {
                        sens: 'suivant'
                    }
                }, '*');
            });

            this._setLabel();
        }

        static get observedAttributes() {
            return ['btn-label'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log('attribute changed', name, oldValue, newValue);

            if (name === 'btn-label') {
                this._setLabel(newValue);
            }
        }

        disconnectedCallback() {
            console.log('disconnected');
        }

        _setLabel(value) {
            if (value === null || value === undefined) {
                value = this.getAttribute('btn-label') || this._defaultLabel;
            }
            this._btnNext.innerText = this._getLiferayTranslatedKey(value);
        }

        _getLiferayTranslatedKey(value) {

            let valueTranslated = Liferay.Language.get(value);
            if (valueTranslated === null || valueTranslated === "null") {
                valueTranslated = this._defaultLabel;
            }

            return valueTranslated;
        }

    } // end class

    window.customElements.define(FwdPortailBtnNext.is, FwdPortailBtnNext);
}
