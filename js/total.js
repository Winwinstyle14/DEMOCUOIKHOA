
//Render giỏ hàng
let giohang = JSON.parse(localStorage.getItem('giohang'));
let product_list = document.querySelector(".product-list");
function loadGiohang(giohang) {
    return `<div class="product-item">
  <img src="${giohang.img}" alt="">
  <div class="product-info">
      <p class="product-name">${giohang.name}</p>
      <p class="product-type">Mã sản phẩm: ${giohang.id}</p>
      <p class="product-amount">Số lượng: ${giohang.count}</p>
  </div>
  <h3>${giohang.price} VNĐ</h3>
</div>`
}
product_list.innerHTML = giohang.map(loadGiohang).join('')
//Giảm giá
let discountCode = {
    A: 5,
    B: 10,
    C: 15,
    D: 20,
};
let inputDiscount = document.querySelector('.discount-code');
function checkDiscount() {
    let value = inputDiscount.value.toUpperCase();
    if (discountCode[value]) {
        return discountCode[value];
    }
    return 0;
}
let btn_apply = document.querySelector('.btn-apply');
btn_apply.addEventListener('click', function (e) {
    e.preventDefault();
    total(JSON.parse(localStorage.getItem('giohang')))
})

//Tính tiền
total(JSON.parse(localStorage.getItem('giohang')))
function total(giohang) {
    tongtien = 0;
    let tiengiamgia = 0;
    for (let i = 0; i < giohang.length; i++) {
        tongtien += giohang[i].price * giohang[i].count
    }
    let magiamgia = checkDiscount()
    if (magiamgia) {
        tiengiamgia = (tongtien * magiamgia) / 100;
    }
    let temporary_amount = document.querySelector(".temporary-amount");
    let discount_amount = document.querySelector('.discount-amount');
    let vanchuyen = parseInt(document.querySelector(".transport-amount").textContent);
    let billing_final = document.querySelector(".billing-final");
    temporary_amount.innerHTML = `<span class="temporary-amount">${tongtien} đ</span>`
    discount_amount.innerHTML = `<span class="discount-amount">${tiengiamgia} đ</span>`
    billing_final.innerHTML = `<span class="billing-final">${tongtien + vanchuyen - tiengiamgia} đ</span>`
}
//Nhập form
letbtn_payment = document.querySelector('.btn-submit-payment');
letbtn_payment.addEventListener('click', (e) => {
    let fullname = document.querySelector('.name').value;
    let email = document.querySelector('.email').value;
    let address = document.querySelector('.address').value;
    let message = document.querySelector('.message').value;
    let city = document.querySelector('#city').value;
    let district = document.querySelector('#district').value;
    let checkbox = document.querySelector("input[type=radio]:checked").value;
    let customer = {
        fullname: fullname,
        email: email,
        address: address,
        message: message,
        city: city,
        district: district,
        checkbox: checkbox,
    };
    let customer_info = [];
    if (localStorage.getItem("customer_info")) {
        customer_info = JSON.parse(localStorage.getItem("customer_info"));
    } else {
        localStorage.setItem("customer_info", JSON.stringify(customer_info));
    }
    customer_info.push(customer);
    localStorage.setItem("customer_info", JSON.stringify(customer_info));
    let giohang = JSON.parse(localStorage.getItem("giohang"))
    let datas = JSON.parse(localStorage.getItem("datas"))
    for (let i = 0; i < datas.length; i++) {
        for (let j = 0; j < giohang.length; j++) {
            if (giohang[j].id == datas[i].id) {
                datas[i].soluong = datas[i].soluong - giohang[j].count
                datas[i].soluongban += giohang[j].count

            }
        }
    }
    localStorage.setItem("datas", JSON.stringify(datas));
    alert("thanh toán ok đấy");
    localStorage.removeItem("giohang")
    loadGiohang(JSON.parse(localStorage.getItem('giohang')))
    total(JSON.parse(localStorage.getItem('giohang')))
})

