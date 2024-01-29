import icons from 'url:../../img/icons.svg';

class RecetteVue {
  #elementParent = document.querySelector('.recipe');
  #data;

  afficherVue(donnees) {
    this.#data = donnees;
    const html = this.#genererHtml();
    this.#nettoyerVue();
    this.#elementParent.insertAdjacentHTML('afterbegin', html);
  }

  #nettoyerVue() {
    this.#elementParent.innerHTML = '';
  }

  afficherIconeDeChargement() {
    const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this.#elementParent.innerHTML = '';
    this.#elementParent.insertAdjacentHTML('afterbegin', html);
  }

  #genererHtml() {
    return `
          <figure class="recipe__fig">
            <img src="${this.#data.image}" alt="${
      this.#data.titre
    }" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this.#data.titre}</span>
            </h1>
          </figure>

          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                this.#data.tempsPreparation
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                this.#data.portions
              }</span>
              <span class="recipe__info-text">personnes</span>

              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>

            <div class="recipe__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="${icons}#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>

          <div class="recipe__ingredients">
            <h2 class="heading--2">Ingrédients de la recette</h2>
            <ul class="recipe__ingredient-list">

              ${this.#data.ingredients
                .map(ing => {
                  return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantite}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unite}</span>
                    ${ing.description}
                  </div>
                </li>
                `;
                })
                .join('')}

              

            </ul>
          </div>

          <div class="recipe__directions">
            <h2 class="heading--2">Comment la réaliser ?</h2>
            <p class="recipe__directions-text">
              Cette recette a été concoctée par
              <span class="recipe__publisher">${
                this.#data.auteur
              }</span>. Pour les instructions détaillées rendez-vous sur le site de l'auteur de la this.#data
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this.#data.url}"
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
}

export default new RecetteVue();
