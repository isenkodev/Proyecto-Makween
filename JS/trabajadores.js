/*Difuminar imagen con el mouse */
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        cards.forEach(c => c.classList.add("blur"));
        card.classList.remove("blur");
        card.classList.add("highlight");
      });
  
      card.addEventListener("mouseleave", () => {
        cards.forEach(c => {
          c.classList.remove("blur");
          c.classList.remove("highlight");
        });
      });
    });
  });

  /*Buscador de trabajadores*/
  function BuscadorTrabajadores(event) {
    event.preventDefault();

    const termino = document.getElementById('buscador').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        if (cardTitle.includes(termino)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}