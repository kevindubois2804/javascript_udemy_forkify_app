import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import Vue from './Vue';

class RecetteVue extends Vue {
  _elementParent = document.querySelector('.recipe');
  _messageDerreur = `Nous n'avons pas pu trouver la recette. Veuillez réessayer`;
  _message = '';

  // le controleur souscrit à la vue (il devient le gestionnaire d'évements). Il reçoit tous les évenements de l'utilisateur et enclenche les actions à effectuer
  affichageALecouteDuHashEtDuChargementDePage(gestionnaireDevements) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, gestionnaireDevements)
    );
  }

  affichageALecouteDuCliqueDesBoutonsDeModifDesPortions(
    gestionnaireDevenements
  ) {
    this._elementParent.addEventListener('click', function (e) {
      const bouton = e.target.closest('.btn--update-servings');

      if (!bouton) return;

      const nouvellesPortions = Number(bouton.dataset.updateTo);

      if (nouvellesPortions > 0) gestionnaireDevenements(nouvellesPortions);
    });
  }

  affichageALecouteDeLaMiseEnFavoriDuneRecette(gestionnaireDevements) {
    this._elementParent.addEventListener('click', function (e) {
      const bouton = e.target.closest('.btn--bookmark');
      if (!bouton) return;
      gestionnaireDevements();
    });
  }

  _genererHtml() {
    return `
          <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${
      this._data.titre
    }" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this._data.titre}</span>
            </h1>
          </figure>

          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                this._data.tempsPreparation
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                this._data.portions
              }</span>
              <span class="recipe__info-text">personnes</span>

              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--update-servings" data-update-to="${
                  this._data.portions - 1
                }">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--update-servings" data-update-to="${
                  this._data.portions + 1
                }">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>

            <div class="recipe__user-generated">
             
            </div>
            <button class="btn--round btn--bookmark">
              <svg class="">
                <use href="${icons}#icon-bookmark${
      this._data.favori ? '-fill' : ''
    }"></use>
              </svg>
            </button>
          </div>

          <div class="recipe__ingredients">
            <h2 class="heading--2">Ingrédients de la recette</h2>
            <ul class="recipe__ingredient-list">

              ${this._data.ingredients
                .map(this._genererHtmlIngredients)
                .join('')}

              

            </ul>
          </div>

          <div class="recipe__directions">
            <h2 class="heading--2">Comment la réaliser ?</h2>
            <p class="recipe__directions-text">
              Cette recette a été concoctée par
              <span class="recipe__publisher">${
                this._data.auteur
              }</span>. Pour les instructions détaillées rendez-vous sur le site de l'auteur de la this._data
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this._data.url}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
    `;
  }

  _genererHtmlIngredients(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantite ? new Fraction(ing.quantite).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unite}</span>
          ${ing.description}
        </div>
      </li>
      `;
  }
}

export default new RecetteVue();
