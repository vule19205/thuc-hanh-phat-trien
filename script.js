
// Lay cac phan tu HTML
const productForm = document.getElementById("productForm");
const maInput = document.getElementById("ma");
const tenInput = document.getElementById("ten");
const productList = document.getElementById("productList");
const emptyMessage = document.getElementById("emptyMessage");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Lay du lieu tu LocalStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Vi tri san pham dang sua
let editIndex = -1;

// Luu du lieu
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Hien thi danh sach san pham
function renderProducts() {
    productList.innerHTML = "";

    if (products.length === 0) {
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;

    products.forEach((product, index) => {
        const row = document.createElement("tr");

        const sttCell = document.createElement("td");
        sttCell.textContent = index + 1;

        const maCell = document.createElement("td");
        maCell.textContent = product.ma;

        const tenCell = document.createElement("td");
        tenCell.textContent = product.ten;

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Sửa";
        editButton.className = "edit-btn";
        editButton.addEventListener("click", () => editProduct(index));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Xóa";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => deleteProduct(index));

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(sttCell);
        row.appendChild(maCell);
        row.appendChild(tenCell);
        row.appendChild(actionCell);

        productList.appendChild(row);
    });
}

// Them hoac cap nhat san pham
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const ma = maInput.value.trim();
    const ten = tenInput.value.trim();

    if (ma === "" || ten === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const trungMa = products.some((product, index) => {
        return product.ma.toLowerCase() === ma.toLowerCase()
            && index !== editIndex;
    });

    if (trungMa) {
        alert("Mã sản phẩm đã tồn tại!");
        return;
    }

    if (editIndex === -1) {
        products.push({ ma: ma, ten: ten });
        alert("Thêm sản phẩm thành công!");
    } else {
        products[editIndex] = { ma: ma, ten: ten };
        alert("Cập nhật sản phẩm thành công!");
    }

    saveProducts();
    renderProducts();
    resetForm();
});

// Sua san pham
function editProduct(index) {
    maInput.value = products[index].ma;
    tenInput.value = products[index].ten;

    editIndex = index;

    formTitle.textContent = "Cập nhật sản phẩm";
    submitBtn.textContent = "Lưu thay đổi";
    cancelBtn.hidden = false;

    maInput.focus();
}

// Xoa san pham
function deleteProduct(index) {
    const xacNhan = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

    if (xacNhan) {
        products.splice(index, 1);

        saveProducts();
        renderProducts();

        if (editIndex === index) {
            resetForm();
        } else if (editIndex > index) {
            editIndex--;
        }
    }
}

// Huy sua san pham
cancelBtn.addEventListener("click", resetForm);

// Dua form ve trang thai ban dau
function resetForm() {
    productForm.reset();

    editIndex = -1;

    formTitle.textContent = "Thêm sản phẩm";
    submitBtn.textContent = "Thêm sản phẩm";
    cancelBtn.hidden = true;
}

// Hien thi du lieu khi mo trang
renderProducts();
