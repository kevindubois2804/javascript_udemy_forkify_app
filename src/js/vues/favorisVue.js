import Vue from './Vue';
import icons from 'url:../../img/icons.svg';
import apercuVue from './apercuVue.js';

class FavorisVue extends Vue {
  _elementParent = document.querySelector('.bookmarks__list');
  _messageDerreur = `Pas de recettes en favoris. Trouvez-en une et ajoutez la dans vos favoris !`;
  _message = '';

  _genererHtml() {
    return this._data
      .map(favori => apercuVue.afficherVue(favori, false))
      .join('');
  }
}

export default new FavorisVue();
