import Vue from './Vue';

class RechercheVue {
  _elementParent = document.querySelector('.search');

  recupererRequete() {
    const requete = this._elementParent.querySelector('.search__field').value;
    this._nettoyerChampRecherche();
    return requete;
  }

  _nettoyerChampRecherche() {
    this._elementParent.querySelector('.search__field').value = '';
  }

  affichageALecouteDeLaRecherche(gestionnaireDevenements) {
    this._elementParent.addEventListener('submit', function (e) {
      e.preventDefault();
      gestionnaireDevenements();
    });
  }
}

export default new RechercheVue();
