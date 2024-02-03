import Vue from './Vue';
import icons from 'url:../../img/icons.svg';

class CreationRecetteVue extends Vue {
  _elementParent = document.querySelector('.upload');
  _fenetreCreationRecette = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _boutonOuvertureFenetre = document.querySelector('.nav__btn--add-recipe');
  _boutonFermetureFenetre = document.querySelector('.btn--close-modal');

  _message = 'La recette a bien été crée !';

  constructor() {
    super();
    this._affichageALecouteDeLouvertureDeFenetreDeCreation();
    this._affichageALecouteDeFermetureDeFenetreDeCreation();
  }

  _affichageALecouteDeLouvertureDeFenetreDeCreation() {
    this._boutonOuvertureFenetre.addEventListener(
      'click',
      this.toggleFenetre.bind(this)
    );
  }

  _affichageALecouteDeFermetureDeFenetreDeCreation() {
    this._boutonFermetureFenetre.addEventListener(
      'click',
      this.toggleFenetre.bind(this)
    );
    this._overlay.addEventListener('click', this.toggleFenetre.bind(this));
  }

  _affichageALecouteDeSoumissionRecette(gestionnaireDevenements) {
    this._elementParent.addEventListener('submit', function (e) {
      e.preventDefault();
      const tableauDonnees = [...new FormData(this)];
      const objetDonnees = Object.fromEntries(tableauDonnees);
      gestionnaireDevenements(objetDonnees);
    });
  }

  toggleFenetre() {
    this._overlay.classList.toggle('hidden');
    this._fenetreCreationRecette.classList.toggle('hidden');
  }

  _genererHtml() {}
}

export default new CreationRecetteVue();
