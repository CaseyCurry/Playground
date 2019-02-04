const cashierChunk = document.querySelector("chunk[itemprop='cashier']");
const cashierMessage = document.createElement("div");
cashierMessage.innerHTML = "waiting for customer...";
cashierChunk.appendChild(cashierMessage);
