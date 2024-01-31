import Vue from './Vue';
import icons from 'url:../../img/icons.svg';
import apercuVue from './apercuVue';

class ApercuVue extends Vue {
  _elementParent = '';
  _genererHtml() {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? 'preview__link--active' : ''
            }" href="#${this._data.id}">
            <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.titre}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${this._data.titre}</h4>
                <p class="preview__publisher">${this._data.auteur}</p>
            </div>
            </a>
        </li>
    `;
  }
}

export default new ApercuVue();
