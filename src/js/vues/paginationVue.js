import Vue from './Vue';
import icons from 'url:../../img/icons.svg';

class PaginationVue extends Vue {
  _elementParent = document.querySelector('.pagination');
  _messageDerreur = `Pas de résultats trouvés pour votre recherche! Veuillez réessayer ;)`;
  _message = '';

  affichageALecouteDuCliqueDesBoutonsDePagination(gestionnaireDevenements) {
    this._elementParent.addEventListener('click', function (e) {
      const bouton = e.target.closest('.btn--inline');

      if (!bouton) return;

      const allerALaPage = Number(bouton.dataset.goto);

      gestionnaireDevenements(allerALaPage);
    });
  }

  _genererHtml() {
    const pageActuelle = this._data.page;
    const nombreDePages = Math.ceil(
      this._data.resultats.length / this._data.resultatsParPage
    );

    // Page 1 et d'autres pages
    if (pageActuelle === 1 && nombreDePages > 1)
      //prettier-ignore
      return `
        <button data-goto="${pageActuelle + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${pageActuelle + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;

    // Dernière page
    if (pageActuelle === nombreDePages && nombreDePages > 1)
      //prettier-ignore
      return `
        <button data-goto="${pageActuelle - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageActuelle - 1}</span>
        </button>
    `;

    // Page quelconque entre début et fin
    if (pageActuelle < nombreDePages)
      //prettier-ignore
      return `
        <button data-goto="${pageActuelle - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageActuelle - 1}</span>
        </button>

        <button data-goto="${pageActuelle + 1} "class="btn--inline pagination__btn--next">
            <span>Page ${pageActuelle + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;

    // Page 1 et pas d'autres pages

    return '';
  }

  _genererApercuHtmlRecette(resultat) {
    return `
          <li class="preview">
              <a class="preview__link" href="#${resultat.id}">
              <figure class="preview__fig">
                  <img src="${resultat.image}" alt="${resultat.titre}" />
              </figure>
              <div class="preview__data">
                  <h4 class="preview__title">${resultat.titre}</h4>
                  <p class="preview__publisher">${resultat.auteur}</p>
              </div>
              </a>
          </li>
      `;
  }
}

export default new PaginationVue();
