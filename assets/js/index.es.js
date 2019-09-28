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
            this._defaultLabel = 'next';
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

            this._btnNext.innerText = this.getAttribute('btn-label') || Liferay.Language.get(this._defaultLabel);
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
            if (value === null) return;
            this._btnNext.innerText = Liferay.Language.get(value);
        }

    } // end class

    class FwdPortailBtnPrevious extends HTMLElement {

        static get is() {
            return 'fwd-portail-btn-previous'
        }

        constructor() {
            super();

            // DOM elements
            this._btnNext = null;
            // data
            this._defaultLabel = 'previous';
            this._defaultStyle = 'secondary';
        }

        connectedCallback() {
            console.log('fwd-portail-btn-previous connected');
            this.innerHTML = `
            <style>
            </style>
            <button id="btn-previous" class="" type="button">
            </button>
        `;

            this._btnNext = document.querySelector('#btn-previous');
            this._btnNext.addEventListener('click', event => {
                console.log('click');

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
            console.log('attribute changed', name, oldValue, newValue);

            if (name === 'btn-label') {
                this._setLabel(newValue);
            } else if (name === 'btn-style') {
                this._setStyle(newValue);
            }
        }

        disconnectedCallback() {
            console.log('disconnected');
        }

        _setLabel(value) {
            if (value === null) {
                value = this.getAttribute('btn-label') || this._defaultLabel;
            }

            this._btnNext.innerText = Liferay.Language.get(value);
        }

        _setStyle(value) {

            if (value === null || !value) {
                value = this._defaultStyle;
            }

            this._btnNext.setAttribute('class', 'btn btn-' + value);
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

    } // end class

    window.customElements.define(FwdPortailBtnPrevious.is, FwdPortailBtnPrevious);
    window.customElements.define(FwdPortailBtnNext.is, FwdPortailBtnNext);
}
