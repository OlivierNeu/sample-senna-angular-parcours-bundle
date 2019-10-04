'use strict';

if (window.customElements.get('fwd-portail-btn-previous') === undefined) {

    class FwdPortailBtnPrevious extends HTMLElement {

        static get is() {
            return 'fwd-portail-btn-previous'
        }

        constructor() {
            super();

            // DOM elements
            this._uuid = FwdPortailBtnPrevious._randomString();
            this._btnPrevious = null;
            // data
            this._defaultLabel = 'sample.previous';
            this._defaultStyle = 'secondary';
        }

        connectedCallback() {
            console.log('fwd-portail-btn-previous connected', this._uuid);
            this.innerHTML = '<style></style><button id="btn-previous-' + this._uuid + '" class="" type="button"></button>';

            this._btnPrevious = document.querySelector('#btn-previous-' + this._uuid);
            this._btnPrevious.addEventListener('click', event => {
                console.log('click', this._uuid);

                window.top.postMessage({
                    event_id: 'navigation',
                    data: {
                        sens: 'precedent'
                    }
                }, '*');
            });

            this._setLabel();
            this._setStyle(this.getAttribute('btn-style'));
        }

        static get observedAttributes() {
            return ['btn-label', 'btn-style'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log('attribute changed', this._uuid, name, oldValue, newValue);

            if (name === 'btn-label') {
                this._setLabel(newValue);
            } else if (name === 'btn-style') {
                this._setStyle(newValue);
            }
        }

        disconnectedCallback() {
            console.log('disconnected', this._uuid);
        }

        _setLabel(value) {
            if (value === null || value === undefined) {
                value = this.getAttribute('btn-label' || this._defaultLabel);
            }

            this._btnPrevious.innerText = this._getLiferayTranslatedKey(value);
        }

        _setStyle(value) {

            if (value === null || !value) {
                value = this._defaultStyle;
            }

            this._btnPrevious.setAttribute('class', 'btn btn-' + value);
        }

        _getLiferayTranslatedKey(value) {

            let valueTranslated = Liferay.Language.get(value);
            if (valueTranslated === null || valueTranslated === "null") {
                valueTranslated = this._defaultLabel;
            }

            return valueTranslated;
        }

        get hidden() {
            return this.hasAttribute('hidden');
        }

        set hidden(isHidden) {
            if (isHidden) {
                this.setAttribute('hidden', '');
            } else {
                this.removeAttribute('hidden');
            }
        }

        static _randomString() {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }

    } // end class

    window.customElements.define(FwdPortailBtnPrevious.is, FwdPortailBtnPrevious);
}
