$(document).ready(function() {
    const cardData = [
        { img: '../IMG/bujias.jpg', title: 'Bujias', description: 'Precio $20.000' },
        { img: '../IMG/NeumaticosMichelin.png', title: 'Neumaticos Michelin', description: 'Precio $20.000' },
        { img: '../IMG/porta.png', title: 'Porta moviles', description: 'Precio $56.000' },
        { img: '../IMG/retrovisor.png', title: 'Retrovisores', description: 'Precio $15.000' },
        { img: '../IMG/plumillas.png', title: 'Plumillas', description: 'Precio $10.000' },
        { img: '../IMG/parlantes.png', title: 'Parlantes', description: 'Precio $70.000' }
    ];


    function createCard(data) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${data.img}" class="card-img-top" alt="${data.title}">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <button class="btn btn-primary add-to-cart">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        `;
    }

    cardData.forEach(data => {
        $('#card-container').append(createCard(data));
    });

    // Initialize Bootstrap modal
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    let cart = [];
    let totalItems = 0;

    // Function to update the cart modal
    function updateCartModal() {
        $('#cartMessage').text(`Total productos en el carrito: ${totalItems}`);
        const cartItems = cart.map(item => `<li>${item.title}</li>`).join('');
        $('#cartItems').html(`<ul>${cartItems}</ul>`);
    }

    // Add click event for the "Añadir al carrito" button
    $(document).on('click', '.add-to-cart', function() {
        const cardIndex = $(this).closest('.card').parent().index();
        const selectedItem = cardData[cardIndex];
        cart.push(selectedItem);
        totalItems++;
        updateCartModal();
        cartModal.show();
    });
    $('#cartButton').on('click', function() {
        updateCartModal();
        cartModal.show();
    });

    $('#cartModal').on('hidden.bs.modal', function () {
        $('body').css('overflow', 'auto'); 
        $('.modal-backdrop').remove();     
    });

    $('#viewCartButton').on('click', function() {
        $('#cartModal').modal('hide'); 
        displayCart();
    });
    function displayCart() {
        const cartContent = `
            <h5>Productos en tu carrito:</h5>
            <ul>
                ${cart.map(item => `<li>${item.title} - ${item.description}</li>`).join('')}
            </ul>
        `;
        $('#cartContent').html(cartContent);
    }
});
