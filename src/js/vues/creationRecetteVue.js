import Vue from './Vue';
import icons from 'url:../../img/icons.svg';

class CreationRecetteVue extends Vue {
  _elementParent = document.querySelector('.upload');
  _fenetreCreationRecette = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  boutonOuvertureFenetre = document.querySelector('.nav__btn--add-recipe');
  boutonFermetureFenetre = document.querySelector('.btn--close-recipe');

  _messageDerreur = `Pas de résultats trouvés pour votre recherche! Veuillez réessayer ;)`;
  _message = '';

  affichageALecouteDeLouvertureDeFenetreDeCreation;

  _genererHtml() {}
}

export default new CreationRecetteVue();
