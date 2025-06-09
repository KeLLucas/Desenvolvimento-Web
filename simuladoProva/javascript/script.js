$(document).ready(function () {
    $.ajax({
        url: "https://fakestoreapi.com/products",
        type: "GET",
        dataType: "json",
        success: function (produtos) {
            $("#total-produtos").text(produtos.length);

            produtos.forEach(function (produto) {
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 d-flex flex-column">
                            <img src="${produto.image}" class="card-img-top" style="height: 200px;padding: 30px; object-fit: contain; alt="${produto.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${produto.title}</h5>
                                <p class="card-text">Preço: R$ ${produto.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                `;
                $("#catalogo").append(card);
            });
        },
        error: function (xhr, status, error) {
            console.error("Erro ao carregar produtos:", error);
        }
    });
});

