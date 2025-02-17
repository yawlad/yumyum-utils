function renderPrices(products) {
  const actionSheet = document.querySelector(".action-sheet");
  actionSheet.innerHTML = "";
  products.forEach((product) => {
    for (let i = 0; i < product.quantity; i++) {
      const actionTag = document.createElement("div");
      actionTag.classList.add("action-tag");
      actionTag.innerHTML = `
            <div class="product-name">${product.name}</div>
        `;
      actionSheet.appendChild(actionTag);
    }
  });
}

function printSection() {
  let section = document.querySelector(".action-sheet"); // Выбираем нужный блок
  let newWindow = window.open("", "_blank"); // Открываем новое окно

  newWindow.document.write(`
      <html>
      <head>
          <title>Печать</title>
          <link rel="stylesheet" href="./style.css" />
      </head>
      <body>
          ${section.outerHTML} <!-- Вставляем содержимое action-sheet -->
          <script>
              window.onload = function() {
                  window.print();
                  window.close();
              };
          <\/script>
      </body>
      </html>
  `);

  newWindow.document.close(); // Закрываем документ, чтобы можно было печатать
}

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const products = JSON.parse(e.target.result);
        renderPrices(products);
      } catch (error) {
        console.error("Ошибка при разборе JSON", error);
      }
    };
    reader.readAsText(file);
  });

document.getElementById("printButton").addEventListener("click", (event) => {
  printSection();
});
