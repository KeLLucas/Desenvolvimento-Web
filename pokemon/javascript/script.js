$(document).ready(function () {
    const totalPokemons = 168; // Total de Pokémons a serem exibidos
    const pokemonsPerPage = 20; // Quantidade de Pokémons por página
    let currentPage = 1; // Página inicial

    // Função para carregar Pokémons por página
    function loadPokemons(page) {
        let offset = (page - 1) * pokemonsPerPage; // Calcula o offset para a requisição
        let tableContent = `
        <table class="table table-striped table-bordered table-hover">
            <thead class="table-dark">
                <tr class="text-center">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Sprite</th>
                    <th>Altura</th>
                    <th>Peso</th>
                </tr>
            </thead>
            <tbody>`;

        // Iterar pelos Pokémons da página
        for (let i = offset + 1; i <= offset + pokemonsPerPage && i <= totalPokemons; i++) {
            let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i}/`;

            // Realizar a requisição para cada Pokémon
            $.getJSON(pokemonUrl, (pokemonDetails) => {
                tableContent += `
                    <tr class="text-center">
                        <td>${pokemonDetails.id}</td>
                        <td>${pokemonDetails.name}</td>
                        <td><img src="${pokemonDetails.sprites.front_default}" alt="Sprite do Pokémon" width="50"></td>
                        <td>${pokemonDetails.height}</td>
                        <td>${pokemonDetails.weight}</td>
                    </tr>`;

                // Se for o último Pokémon da página, finaliza a tabela
                if (i === offset + pokemonsPerPage || i === totalPokemons) {
                    tableContent += `</tbody></table>`;
                    $("#poketable").html(tableContent); // Atualiza o conteúdo da tabela
                }
            });
        }
    }

    // Carregar a primeira página de Pokémons
    loadPokemons(currentPage);

    // Atualiza o número da página exibido
    function updatePageNumber() {
        $("#pageNumber").text(`Página ${currentPage}`);
        $("#prevPage").prop("disabled", currentPage === 1); // Desabilita o botão "Anterior" na primeira página
        $("#nextPage").prop("disabled", currentPage === Math.ceil(totalPokemons / pokemonsPerPage)); // Desabilita o botão "Próxima" na última página
    }

    // Navegação para a página anterior
    $("#prevPage").click(function () {
        if (currentPage > 1) {
            currentPage--;
            loadPokemons(currentPage);
            updatePageNumber();
        }
    });

    // Navegação para a próxima página
    $("#nextPage").click(function () {
        if (currentPage < Math.ceil(totalPokemons / pokemonsPerPage)) {
            currentPage++;
            loadPokemons(currentPage);
            updatePageNumber();
        }
    });

    // Inicializa o número da página
    updatePageNumber();
});
