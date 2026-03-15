const apiURL =
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1";

async function getCryptoData(){

    const res = await fetch(apiURL);
    const data = await res.json();

    showCoins(data);
}

function showCoins(coins){

    const container = document.getElementById("cryptoContainer");

    container.innerHTML = "";

    coins.forEach(coin => {

        let changeColor = coin.price_change_percentage_24h >= 0 ? "green" : "red";

        let usdPrice = coin.current_price;

        let inrPrice = usdPrice * 83;

        let card = document.createElement("div");

        card.classList.add("crypto-card");

        card.innerHTML = `
        <img src="${coin.image}">
        <h3>${coin.name}</h3>
        <p>${coin.symbol.toUpperCase()}</p>
        <p class="price">$${usdPrice}</p>
        <p style="color:${changeColor}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
        `;

        const priceElement = card.querySelector(".price");

        // hover → INR
        card.addEventListener("mouseenter", () => {

            priceElement.innerText = "₹" + inrPrice.toLocaleString();
            //when hover color change to magenta
            priceElement.style.color = "magenta";

        });

        // hover remove → USD
        card.addEventListener("mouseleave", () => {

            priceElement.innerText = "$" + usdPrice;
            //when hover remove color change to black
            priceElement.style.color = "black";

        });

        container.appendChild(card);

    });

}

getCryptoData();