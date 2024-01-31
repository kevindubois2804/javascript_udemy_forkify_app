import Vue from './Vue';
import icons from 'url:../../img/icons.svg';
import apercuVue from './apercuVue.js';

class ResultatsVue extends Vue {
  _elementParent = document.querySelector('.results');
  _messageDerreur = `Pas de résultats trouvés pour votre recherche! Veuillez réessayer ;)`;
  _message = '';

  _genererHtml() {
    return this._data
      .map(resultat => apercuVue.afficherVue(resultat, false))
      .join('');
  }
}

export default new ResultatsVue();
