import { renommerLesProprietesDunObject } from './utils';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recetteContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const afficherIconeDeChargement = function (elementParent) {
  const html = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  elementParent.innerHTML = '';
  elementParent.insertAdjacentHTML('afterbegin', html);
};

const afficherRecette = async function () {
  try {
    // on recupere l'id présent dans le hash de l'url
    const id = window.location.hash.slice(1);

    // petite protection dans le cas où pas de id dans le hash
    if (!id) return;

    // on affiche un icone de chargement pendant que le fetchs e fait
    afficherIconeDeChargement(recetteContainer);
    // on récupère un object de type Response
    const reponse = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    // on convertit la réponse au format json
    const donnees = await reponse.json();

    if (!reponse.ok) throw new Error(`${donnees.message} (${reponse.status})`);

    // On réecrit l'objet données dans une variable recette un peu lieux formattée
    let recette = donnees.data.recipe;
    recette = {
      id: recette.id,
      titre: recette.title,
      auteur: recette.publisher,
      url: recette.source_url,
      image: recette.image_url,
      portions: recette.servings,
      tempsPreparation: recette.cooking_time,
      ingredients: recette.ingredients,
    };

    // On renomme aussi les propriétés des objects contenues dans recette.ingredients. Pour cela on fait appelle à une fonction récursive
    const clefs = {
      quantity: 'quantite',
      unit: 'unite',
    };
    recette.ingredients = renommerLesProprietesDunObject(
      recette.ingredients,
      clefs
    );

    console.log(recette);

    // On affiche maintenant le bout de code html de la recette

    codeHtmlRecette = `
          <figure class="recipe__fig">
            <img src="${recette.image}" alt="${
      recette.titre
    }" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${recette.titre}</span>
            </h1>
          </figure>

          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${
                recette.tempsPreparation
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${
                recette.portions
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

              ${recette.ingredients
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
                recette.auteur
              }</span>. Pour les instructions détaillées rendez-vous sur le site de l'auteur de la recette
            </p>
            <a
              class="btn--small recipe__btn"
              href="${recette.url}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
    `;

    recetteContainer.innerHTML = '';
    recetteContainer.insertAdjacentHTML('afterbegin', codeHtmlRecette);
  } catch (erreur) {
    alert(erreur);
  }
};

afficherRecette();

// on fait une écoute au changement de hash à la fin de l'url et aussi à la chargement de la page

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, afficherRecette)
);
