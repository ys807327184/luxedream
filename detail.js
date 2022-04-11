let product_id = parseInt(getUrlParam('product_id'));
let product = rawdata.find(({prodId}) => prodId === product_id);

let detail_container = document.querySelector('.detail-outer-container');

window.onload = function() {
  let category = product.category.categoryName;
  let title = product.title;
  let pic = product.productMedia;
  let description = product.description;
  let price = product.price;

  document.title = title;

  detail_container.innerHTML = `
    <div class="detail-header">
      ${category} / ${title}
    </div>
    <div class="detail-container row">
      <div class="detail-image col-12 col-sm-12 col-md-7">
       <img src="https://storage.googleapis.com/luxe_media/wwwroot/${pic[0].url}">
      </div>
      <div class="product-details col-12 col-sm-12 col-md-5">
       <div class="product-detail-title">${title}</div>
       <div class="product-detail-price">Price: $${price}</div>
       <div class="product-detail-description">${description}</div>
      </div>
    </div>
    <div class="button-return" onclick="history.back()">
      <i class="bi bi-chevron-double-left"></i>
      <span>Go Back</span>
    </div>
  `;

  if (pic.length > 1) {
    let detail_image = document.querySelector(".detail-image");
    detail_image.innerHTML = `
    <div id="detail-carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
      </div>
      <div class="carousel-inner">
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#detail-carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#detail-carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
    `;

    let carousel_indicators = document.querySelector(".carousel-indicators");
    let carousel_inner = document.querySelector(".carousel-inner");
    for (let i = 0; i < pic.length; i++) {
      if (i == 0) {
        carousel_indicators.innerHTML += `
          <button type="button" data-bs-target="#detail-carousel" data-bs-slide-to="0" class="active"></button>
        `;
        carousel_inner.innerHTML += `
          <div class="carousel-item active">
            <img src="https://storage.googleapis.com/luxe_media/wwwroot/${pic[i].url}" class="d-block w-100">
          </div>
        `;
      } else {
        carousel_indicators.innerHTML += `
          <button type="button" data-bs-target="#detail-carousel" data-bs-slide-to="${i}"></button>
        `;
        carousel_inner.innerHTML += `
          <div class="carousel-item">
            <img src="https://storage.googleapis.com/luxe_media/wwwroot/${pic[i].url}" class="d-block w-100">
          </div>
        `;
      }
    }
  }
}

//Encapsulated Function
function getUrlParam(paramName) {
  const url = window.location.search.substring(1);
  const urlParams = new URLSearchParams(url);
  return urlParams.get(paramName);
}