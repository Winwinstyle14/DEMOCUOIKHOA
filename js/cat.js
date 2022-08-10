
let listData = JSON.parse(localStorage.getItem("datas"));
let grid_row = document.querySelector(`.meo`);

let meo = listData.filter(data => data.loai == 'meo')
function listCat(datas) {
  return `<div class="grid__column2_4" >
        <div class="product-card">
          <a class="product_link">
            <div class="product-frame" onclick="chuyentrang(${datas.id})">
              <img
                src="${datas.hinhanh}"
                class="product-img" alt="" />
            </div>
            <div class="product-caption" onclick="chuyentrang(${datas.id})">
              <p class="product-name">${datas.tensp}</p>
              <p class="product-price">${datas.gia}</p>
              <p class="product-id" style="display: none;">${datas.id}</p>
            </div>
            <div class="product-action" onclick="themgiohang(this)">
              <span><i class="fa-solid fa-cart-plus"></i></span>
            </div>
          </a>
        </div>
      </div>`
}
grid_row.innerHTML = meo.map(listCat).join('')
soluongsanpham(JSON.parse(localStorage.getItem("giohang")))

function chuyentrang(id) {
  window.location.href = "chitietsanpham.html";
  let newid = id - 1;
  let sanpham = listData[newid];
  localStorage.setItem("sanpham1", JSON.stringify(sanpham));
}

// danh muc
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i].danhmuc)) {
      newArr.push(arr[i].danhmuc)
    }
  }
  return newArr
}

listDanhmuc = unique(listData)

let category = document.querySelector(".category_list")
function loadDanhmuc(datas) {

  return `
    <li class="category_list_item category_item_active">
      <a href="" class="category_link">${datas}</a>
    </li>`
}
category.innerHTML = listDanhmuc.map(loadDanhmuc).join('')

//lay du lieu theo danh muc
let ul = document.querySelector(".category_list")
ul.addEventListener('click', function (e) {
  e.preventDefault();
  let danhmucuodcchon = e.target.innerText
  let load = meo.filter(data => data.danhmuc == danhmucuodcchon)
  grid_row.innerHTML = load.map(listCat).join('')
})
// tim kiem
const product = document.querySelector('.grid__row');
const forms = document.forms;
const search = forms['header__search_form'];
search.addEventListener('keyup', function (e) {
  e.preventDefault();
  const input = search.querySelector('input');
  const filter = input.value.toUpperCase();
  const grid_c = product.querySelectorAll('.grid__column2_4');
  for (let i = 0; i < grid_c.length; i++) {
    const div = grid_c[i].querySelector('.product-name');
    const name = div.textContent;
    if (name.toUpperCase().indexOf(filter) > -1) {
      grid_c[i].style.display = '';
    } else {
      grid_c[i].style.display = 'none';
    }
  }
})


let giohang
if (localStorage.getItem('giohang')) {
  giohang = JSON.parse(localStorage.getItem('giohang'));
} else {
  giohang = []
}
soluongsanpham(JSON.parse(localStorage.getItem("giohang")))

function themgiohang(data) {
  let product = data.parentElement.children
  let productImg = product[0].children[0].src
  let productName = product[1].children[0].textContent
  let productPrice = product[1].children[1].textContent
  let productCount = 1
  let productId = product[1].children[2].textContent
  let productArr = { id: productId, img: productImg, name: productName, price: productPrice, count: productCount }
  let kt = 0
  for (let i = 0; i < giohang.length; i++) {
    if (giohang[i].name == productName) {
      kt = 1;
      productCount += giohang[i].count
      giohang[i].count = productCount
      break;
    }
  } if (kt == 0) {
    giohang.push(productArr)
  }

  localStorage.setItem("giohang", JSON.stringify(giohang));



  soluongsanpham(JSON.parse(localStorage.getItem("giohang")))
  total(JSON.parse(localStorage.getItem("giohang")))
  hienthigiohang(JSON.parse(localStorage.getItem("giohang")))

}
//hien gio hang
function hienthigiohang(giohang) {
  let cart_list_item = document.querySelector('.cart_list_item')
  function hienthisanpham(datas) {

    return ` <li class="cart_list_item1">
      <img
        src="${datas.img}"
        alt="" class="header_cart_item1" />
      <div class="cart_item_info">
        <h5 class="cart_text_pd">
        ${datas.name}
        </h5>
        <span class="cart_pd_price">${datas.price} VND</span>
        <span class="cart_pd_multiply">x</span>
        <span class="cart_pd_qnt">${datas.count}</span>
      </div>
      <div class="cart_item_info1">
      </div>
      </li> 
        `
  }
  cart_list_item.innerHTML = giohang.map(hienthisanpham).join('')

}


// gio hang

let click_header = document.querySelector('.header_cart')
let header__cart_list = document.querySelector('.header__cart_list')
click_header.addEventListener('click', function (e) {
  console.log(e.target.className)
  if (header__cart_list.style.display == 'block') {
    header__cart_list.style.display = 'none'
  }
  else {
    header__cart_list.style.display = 'block'
    hienthigiohang(JSON.parse(localStorage.getItem("giohang")))
    total(JSON.parse(localStorage.getItem("giohang")))
  }

})

// xem gio hang
xemgiohang()

function xemgiohang() {
  let btn_cart_pd = document.querySelector('.btn_cart_pd')
  btn_cart_pd.addEventListener('click', function () {
    window.location.href = "cart.html";
  })
}

// tinh tong tien 
function total(giohang) {
  let tong_tien = document.querySelector('.tong_tien')
  tongtien = 0;
  for (let i = 0; i < giohang.length; i++) {
    tongtien += giohang[i].price * giohang[i].count
  }
  tong_tien.innerHTML = ` ${tongtien} VNĐ`
}

// so luong san pham
function soluongsanpham(datas) {
  let header_cart_num = document.querySelector('.header-cart-num')
  if (datas) {
    header_cart_num.innerHTML = `${datas.length}`
  } else {
    header_cart_num.innerHTML = `${0}`
  }
}
//Check account
let btn__DKDN = document.querySelector('.btn__DKDN');
let btn__DN = document.querySelector('.btn__DN');
let btn__DX = document.querySelector('.btn__DX');
function checkAccount() {
  let account_name = document.querySelector('.account_name');
  if (localStorage.getItem('account')) {
    let account = JSON.parse(localStorage.getItem("account"));
    btn__DKDN.style.display = 'none';
    btn__DN.style.display = 'none';
    btn__DX.style.display = 'block';
    account_name.style.display = '';
    account_name.innerHTML = `${account.username}`
  } else {
    btn__DKDN.style.display = 'block';
    btn__DN.style.display = 'block';
    btn__DX.style.display = 'none';
    account_name.style.display = 'none';
  }
}
checkAccount()
function dangxuat() {
  btn__DX.addEventListener('click', function (e) {
    localStorage.removeItem("account")
    checkAccount()
  })
}
dangxuat()