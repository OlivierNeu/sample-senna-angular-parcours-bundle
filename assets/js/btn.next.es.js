'use strict';

if (window.customElements.get('fwd-portail-btn-next') === undefined) {

    class FwdPortailBtnNext extends HTMLElement {

        static get is() {
            return 'fwd-portail-btn-next'
        }

        constructor() {
            super();

            // DOM elements
            this._uuid = FwdPortailBtnNext._randomString();
            this._btnNext = null;
            // data
            this._defaultLabel = 'sample.next';
        }

        connectedCallback() {
            console.log('fwd-portail-btn-next connected', this._uuid);
            this.innerHTML = '<style></style><button id="btn-next-' + this._uuid + '" class="btn btn-primary" type="button"></button>';

            this._btnNext = document.querySelector('#btn-next-' + this._uuid);
            this._btnNext.addEventListener('click', event => {
                console.log('click', this._uuid);

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
            console.log('attribute changed', this._uuid, name, oldValue, newValue);

            if (name === 'btn-label') {
                this._setLabel(newValue);
            }
        }

        disconnectedCallback() {
            console.log('disconnected', this._uuid);
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

        static _randomString() {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }

    } // end class

    window.customElements.define(FwdPortailBtnNext.is, FwdPortailBtnNext);
}
