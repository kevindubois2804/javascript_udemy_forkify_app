import icons from 'url:../../img/icons.svg';

export default class Vue {
  _data;

  afficherVue(donnees, affichage = true) {
    //prettier-ignore
    if (!donnees || (Array.isArray(donnees) && donnees.length === 0)) return this.afficherErreurs();

    this._data = donnees;
    const html = this._genererHtml();

    if (!affichage) return html;

    this._nettoyerVue();
    this._elementParent.insertAdjacentHTML('afterbegin', html);
  }

  modifierVue(donnees) {
    // if (!donnees || (Array.isArray(donnees) && donnees.length === 0))
    //   return this.afficherErreurs();

    this._data = donnees;
    const nouvelHtml = this._genererHtml();

    const nouveauDOMVirtuel = document
      .createRange()
      .createContextualFragment(nouvelHtml);

    const nouveauxElementsDOMVirtuel = Array.from(
      nouveauDOMVirtuel.querySelectorAll('*')
    );
    const elementsDOMActuels = Array.from(
      this._elementParent.querySelectorAll('*')
    );

    nouveauxElementsDOMVirtuel.forEach((nouvelElement, index) => {
      const elementDOMActuel = elementsDOMActuels[index];

      // condition pour changer le contenu du texte uniquement sur les elements du dom modifiés
      if (
        !nouvelElement.isEqualNode(elementDOMActuel) &&
        nouvelElement.firstChild?.nodeValue.trim() !== ''
      ) {
        elementDOMActuel.textContent = nouvelElement.textContent;
      }

      // condition pour changer les attributs uniquement sur les elements du dom modifiés
      if (!nouvelElement.isEqualNode(elementDOMActuel)) {
        Array.from(nouvelElement.attributes).forEach(attribute => {
          elementDOMActuel.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }

  _nettoyerVue() {
    this._elementParent.innerHTML = '';
  }

  afficherIconeDeChargement() {
    const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._nettoyerVue();
    this._elementParent.insertAdjacentHTML('afterbegin', html);
  }

  afficherErreurs(message = this._messageDerreur) {
    const html = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._nettoyerVue();
    this._elementParent.insertAdjacentHTML('afterbegin', html);
  }

  afficherMessage(message = this._message) {
    const html = `
      <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
        <p>${message}</p>
      </div>
    `;
    this._nettoyerVue();
    this._elementParent.insertAdjacentHTML('afterbegin', html);
  }
}
