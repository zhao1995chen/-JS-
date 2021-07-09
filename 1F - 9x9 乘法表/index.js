(function () {
  function calculate() {
    const parent = document.querySelector('.content .container .row');
    for (let i = 2; i < 10; i++) {
      let html = `
      <div class="number rect">
        <h1>${i}</h1>
        <div class="container">
          <div class="row">`;

      for (let j = 1; j < 10; j++) {
        html += `<p class="exp">${i} × ${j} ＝ ${i * j}</p>`;
      }
      html += `
          </div>
        </div>
      </div>`;

      parent.innerHTML += html;
    }
  }

  window.onload = calculate;
})();
