// hien thi san pham trong chi tiet gio hang
let cart_2 = document.querySelector(".cart_2")
soluongsanpham(JSON.parse(localStorage.getItem("giohang")))

total(JSON.parse(localStorage.getItem("giohang")))
hienthisanphamgiohang(JSON.parse(localStorage.getItem("giohang")))
function hienthisanphamgiohang(giohang) {
  function hienthichitietgiohang(datas) {

    return ` <div class="tong_gio">
    <div class="cart_ct1">
      <div class="cart-slide">
        <img class="cart-img" src="${datas.img}" alt="sp" />
      </div>
      <div class="cart-infomation">
        <div class="cart-title">
          <p>${datas.name}</p>
        </div>

        <span style="color: rgb(122, 122, 122)" class="cart-id"
          >Mã sản phẩm:
          <span class="id_san_pham"> ${datas.id} </span>
        </span>
        <div class="pro-price">
          <h3>${datas.price} VNĐ</h3>
        </div>
        <form id="add-item-form" name="variant-form" action="#">
          <div class="quantity-area">
            <input
              id="reduce-quantity-btn"
              type="button"
              value="-"
              class="change-quantity-btn"
              onclick="tru_san_pham(this)"
            />
            <input
              id="quantity"
              min="1"
              name="quantity"
              type="text"
              value="${datas.count}"
            />
            <input
              id="raise-quantity-btn"
              type="button"
              value="+"
              class="change-quantity-btn"
              onclick="cong_san_pham(this)"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="tong_tien">
      <span
        class="cart_pd_multiply1"
        style="padding: 0 0 0 68px"
        onclick="delete_sp(${datas.id})"
        >x</span
      >
      <span>${datas.price * datas.count} VND</span>
    </div>
  </div>`
  }
  cart_2.innerHTML = giohang.map(hienthichitietgiohang).join('')
}
// tinh tong tien
function total(giohang) {
  tongtien = 0;
  for (let i = 0; i < giohang.length; i++) {
    tongtien += giohang[i].price * giohang[i].count
  }
  let form_thongtin_tien = document.querySelector(".form_thongtin_tien")
  form_thongtin_tien.innerHTML = `<p>Tổng tiền :</p>
    <span>${tongtien} VND</span> `
}



// + - so luong san pham
function tru_san_pham(e) {
  let product = e.parentElement.parentElement.parentElement.children
  let productId = product[1].children[0].innerText
  let arr = JSON.parse(localStorage.getItem("giohang"))

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == productId && arr[i].count > 0) {
      arr[i].count--
    }
  }
  localStorage.setItem("giohang", JSON.stringify(arr));
  hienthisanphamgiohang(JSON.parse(localStorage.getItem("giohang")))
  total(JSON.parse(localStorage.getItem("giohang")))
}

function cong_san_pham(e) {
  let product = e.parentElement.parentElement.parentElement.children
  let productId = product[1].children[0].innerText

  let arr = JSON.parse(localStorage.getItem("giohang"))

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == productId) {
      arr[i].count++
    }
  }
  localStorage.setItem("giohang", JSON.stringify(arr));
  hienthisanphamgiohang(JSON.parse(localStorage.getItem("giohang")))
  total(JSON.parse(localStorage.getItem("giohang")))

}
// nut thanh toan
// function thanhtoan(e) {
//   e.preventDefault();
//   let giohang = JSON.parse(localStorage.getItem("giohang"))
//   console.log(123);
//   // alert("thanh toán ok đấy")
//   // localStorage.removeItem("giohang")
// }
function thanhtoan() {
  let btn_thanhtoan = document.querySelector(".btn_btn_thanhtoan");
  btn_thanhtoan.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = "chitietthanhtoan.html";
    // let giohang = JSON.parse(localStorage.getItem("giohang"))
    // let datas = JSON.parse(localStorage.getItem("datas"))
    // for (let i = 0; i < datas.length; i++) {
    //   for (let j = 0; j < giohang.length; j++) {
    //     if (giohang[j].id == datas[i].id) {
    //       datas[i].soluong = datas[i].soluong - giohang[j].count
    //       datas[i].soluongban += giohang[j].count

    //     }
    //   }
    // }
    // console.log(datas);
    // localStorage.setItem("datas", JSON.stringify(datas));
    // alert("thanh toán ok đấy")
    // localStorage.removeItem("giohang")
  })
}
thanhtoan()
function delete_sp(id) {
  let sanphamgiohang = JSON.parse(localStorage.getItem("giohang"))
  for (let i = 0; i < sanphamgiohang.length; i++) {
    if (sanphamgiohang[i].id == id) {

      sanphamgiohang.splice(i, 1)
    }

  }
  localStorage.setItem("giohang", JSON.stringify(sanphamgiohang));
  hienthisanphamgiohang(JSON.parse(localStorage.getItem("giohang")))
  total(JSON.parse(localStorage.getItem("giohang")))
  soluongsanpham(JSON.parse(localStorage.getItem("giohang")))
}
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