initialParams();
let categoryId = parseInt(getUrlParam('category_id'));
let price = parseInt(getUrlParam('price'));
let sort = parseInt(getUrlParam('sort'));
let currentPage = parseInt(getUrlParam('current_page'));
let pageCount = 0;
const allProduct = rawdata.filter(item => item.productMedia[0]);
let filteredProduct = [];

const item_list = document.querySelector(".item-list");
const pagination = document.querySelector(".pagination");
const filter_category = document.querySelector("#filter-category");
const filter_price = document.querySelector('#filter-price');
const ltoh = document.querySelector('.ltoh');
const htol = document.querySelector('.htol');

filter();

loadList(filteredProduct);

//Encapsulated Functions
function initialParams() {
  let url = new URL(window.location);
  if (url.searchParams.get('category_id') == null) {
    url.searchParams.set('category_id', 0);
    window.location.assign(url);
  }
  if (url.searchParams.get('price') == null) {
    url.searchParams.set('price', 0);
    window.location.assign(url);
  }
  if (url.searchParams.get('sort') == null) {
    url.searchParams.set('sort', 0);
    window.location.assign(url);
  }
  if (url.searchParams.get('current_page') == null) {
    url.searchParams.set('current_page', 1);
    window.location.assign(url);
  }
}

function filter() {
  filter_category.value = getUrlParam('category_id');
  filter_price.value = getUrlParam('price');
  if ((categoryId == 0) && (price == 0)) {
    filteredProduct = allProduct;
  } else {
    if (categoryId != 0) {
      filteredProduct = allProduct.filter(item => item.categoryId == categoryId);
    } else {
      filteredProduct = allProduct;
    }
    if (price == 100) {
      filteredProduct = filteredProduct.filter(item => (item.price >= 0) && (item.price <= 100));
    } else if (price == 500) {
      filteredProduct = filteredProduct.filter(item => (item.price >= 101) && (item.price <= 500));
    } else if (price == 1000) {
      filteredProduct = filteredProduct.filter(item => (item.price >= 501) && (item.price <= 1000));
    } else if (price == 1001) {
      filteredProduct = filteredProduct.filter(item => item.price >= 1001);
    }
  }

  if (sort == 0) {
    if (!ltoh.classList.contains('active')) {
      ltoh.classList.add('active');
    }
    if (htol.classList.contains('active')) {
      htol.classList.remove('active');
    }
    filteredProduct = filteredProduct.sort(function(a, b) {
      return a.price - b.price;
    });
  } else {
    if (!htol.classList.contains('active')) {
      htol.classList.add('active');
    }
    if (ltoh.classList.contains('active')) {
      ltoh.classList.remove('active');
    }
    filteredProduct = filteredProduct.sort(function(a, b) {
      return a.price - b.price;
    }).reverse();
  }
}

function getUrlParam(paramName) {
  const url = window.location.search.substring(1);
  const urlParams = new URLSearchParams(url);
  return urlParams.get(paramName);
}

function loadList(list) {
  if (list.length == 0) {
    history.back();
  } else {
    renderList(pageSlice(list));
    countPage(list);
    renderPagination();
  }
}

function renderList(items) {
  item_list.innerHTML = '';
  for (let item of items) {
    let productId = item.prodId;
    let title = item.title;
    let price = item.price;
    let pic = item.productMedia[0].url;

    item_list.innerHTML += `
      <div class="item-container col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
        <a class="item-link" href="detail.html?product_id=${productId}">
          <div class="item-image">
            <div class="img-container">
              <img src="https://storage.googleapis.com/luxe_media/wwwroot/${pic}">
            </div>
          </div>
          <div class="item-title">
            ${title}
          </div>
          <div class="item-price">
            Price: $${price}
          </div>
        </a>
      </div>
    `;
  }
}

function pageSlice(list) {
  return list.slice(24 * (currentPage - 1), 24 * currentPage);
}

function countPage(list) {
  pageCount = Math.ceil(list.length / 24);
}

function renderPagination() {
  pagination.innerHTML = '';
  pagination.innerHTML += `
    <li class="page-item btn-previous">
      <a class="page-link" href="index.html?current_page=${currentPage - 1}&category_id=${categoryId}&price=${price}&sort=${sort}">Previous</a>
    </li>
  `;
  for (let i = 1; i <= pageCount; i++) {
    pagination.innerHTML += `
      <li class="page-item page-${i}"><a class="page-link" href="index.html?current_page=${i}&category_id=${categoryId}&price=${price}&sort=${sort}">${i}</a></li>
    `;
  }
  pagination.innerHTML += `
    <li class="page-item btn-next">
      <a class="page-link" href="index.html?current_page=${currentPage + 1}&category_id=${categoryId}&price=${price}&sort=${sort}">Next</a>
    </li>
  `;
  if (currentPage == 1) {
    document.querySelector(".btn-previous").classList.add("disabled");
  }
  if (currentPage == pageCount) {
    document.querySelector(".btn-next").classList.add("disabled");
  }
  document.querySelector(`.page-${currentPage}`).classList.add("disabled");
}

function setFilter() {
  let url = new URL(window.location);
  url.searchParams.set('category_id', filter_category.value);
  url.searchParams.set('price', filter_price.value);
  url.searchParams.set('current_page', 1);
  window.location.assign(url);
}

function setLtoH() {
  let url = new URL(window.location);
  url.searchParams.set('sort', 0);
  window.location.assign(url);
}

function setHtoL() {
  let url = new URL(window.location);
  url.searchParams.set('sort', 1);
  window.location.assign(url);
}

function resetFilter() {
  let url = new URL(window.location);
  url.searchParams.set('category_id', 0);
  url.searchParams.set('price', 0);
  url.searchParams.set('current_page', 1);
  url.searchParams.set('sort', 0);
  window.location.assign(url);
}