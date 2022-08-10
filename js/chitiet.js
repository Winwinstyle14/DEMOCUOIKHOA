
let product_ct1 = document.querySelector('.product_ct1');
hienthisanphamgiohang(JSON.parse(localStorage.getItem('sanpham1')));
function hienthisanphamgiohang(sanpham) {
  localStorage.setItem("sanpham1", JSON.stringify(sanpham));
  product_ct1.innerHTML = `
        <div class="product-slide">
          <img class="product-img"
            src="${sanpham.hinhanh}"
            alt="sp" />
        </div>
        <div class="product-infomation">
          <div class="product-title">
            <h1>${sanpham.tensp}</h1>
          </div>

          <span style="color: rgb(122, 122, 122)" class="product-id">${sanpham.id}</span>
          <div class="pro-price">
            <h3>${sanpham.gia}</h3>
          </div>
          <form id="add-item-form" name="variant-form" action="#">
            <div class="quantity-area">
              <input id="reduce-quantity-btn" type="button" value="-" class="change-quantity-btn onclick="tru_san_pham(this)""
                onclick="tru_san_pham(this)" />
              <input id="quantity" min="1" name="quantity" type="text" value="${sanpham.count}" />
              <input id="raise-quantity-btn" type="button" value="+" class="change-quantity-btn onclick="cong_san_pham(this)""
                onclick="cong_san_pham(this)" />
            </div>

            <div class="underline">
              <button id="add-product-to-cart" class="hero-btn-full" type="submit" onclick="themgiohang(this)">
                THÊM VÀO GIỎ
              </button>
              <button id=" add-product-to-cart" class="hero-btn-full muahang" type="submit">
                MUA HÀNG
              </button>
            </div>
          </form>

          <div class="description-section section">
            <h3>Mô tả</h3>
            <ul>
              <li>
                ${sanpham.mota}
              </li>
            </ul>
          </div>
        </div>
      </div>`
}
let giohang
if (localStorage.getItem('giohang')) {
  giohang = JSON.parse(localStorage.getItem('giohang'));
} else {
  giohang = []
}
soluongsanpham(JSON.parse(localStorage.getItem("giohang")))
total(JSON.parse(localStorage.getItem("giohang")))
function themgiohang(data) {
  let product = data.parentElement.parentElement.parentElement.parentElement.children
  let productImg = product[0].children[0].src
  let productName = product[1].children[0].children[0].textContent
  let productId = product[1].children[1].textContent
  let productCount = parseInt(product[1].children[3].children[0].children[1].value)
  let productPrice = product[1].children[2].children[0].textContent
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
  tong_tien.innerHTML = ` ${tongtien}`
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
function tru_san_pham(e) {
  let product = e.parentElement.parentElement.parentElement.children
  let productId = product[1].innerText
  let arr = JSON.parse(localStorage.getItem("sanpham1"))
  if (arr.id == productId && arr.count > 0) {
    arr.count--
  }
  localStorage.setItem("giohang", JSON.stringify(arr));
  hienthisanphamgiohang(JSON.parse(localStorage.getItem("giohang")))
}

function cong_san_pham(e) {
  let product = e.parentElement.parentElement.parentElement.children
  let productId = product[1].innerText

  let arr = JSON.parse(localStorage.getItem("sanpham1"))
  if (arr.id == productId && arr.count < arr.soluong) {
    arr.count++
  }
  localStorage.setItem("sanpham1", JSON.stringify(arr));
  hienthisanphamgiohang(JSON.parse(localStorage.getItem("sanpham1")))
}

function chitietgiohang() {
  let muahang = document.querySelector(".muahang");
  muahang.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = "cart.html";
  })
}
chitietgiohang();

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