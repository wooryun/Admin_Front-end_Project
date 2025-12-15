const product_data = [
  { category: "상의", brand: "Supreme", product: "슈프림 박스로고 후드티", price: "390,000", gender: "남" },
  { category: "하의", brand: "DIESEL", product: "디젤 트랙 팬츠", price: "188,000", gender: "남" },
  { category: "신발", brand: "Nike", product: "나이키 에어포스 1", price: "137,000", gender: "공용" },
  { category: "패션잡화", brand: "Music&Goods", product: "빵빵이 키링", price: "29,000", gender: "공용" },
  { category: "상의", brand: "ADER ERROR", product: "아더에러 셔츠", price: "210,000", gender: "여" },
  { category: "하의", brand: "Stussy", product: "스투시 스웨트 팬츠", price: "165,000", gender: "공용" },
  { category: "신발", brand: "Asics", product: "젤-카야노 14", price: "179,000", gender: "남" },
  { category: "패션잡화", brand: "Maison Kitsune", product: "폭스 가죽 카드지갑", price: "159,000", gender: "여" },
  { category: "상의", brand: "AMI", product: "아미 하트 로고 니트", price: "348,000", gender: "여" },
  { category: "하의", brand: "Carhartt", product: "카브 팬츠", price: "149,000", gender: "남" },
  { category: "신발", brand: "Adidas", product: "삼바 OG", price: "139,000", gender: "공용" },
  { category: "패션잡화", brand: "Gentle Monster", product: "젠틀몬스터 선글라스", price: "370,000", gender: "여" },
  { category: "상의", brand: "Stone Island", product: "스톤아일랜드 쉘 재킷", price: "490,000", gender: "남" },
  { category: "하의", brand: "Lululemon", product: "러너 조거 팬츠", price: "169,000", gender: "여" },
  { category: "신발", brand: "New Balance", product: "993 그레이", price: "259,000", gender: "공용" },
  { category: "패션잡화", brand: "Andersson Bell", product: "레더 버킷백", price: "215,000", gender: "여" },
  { category: "상의", brand: "Patagonia", product: "후드 플리스 자켓", price: "189,000", gender: "공용" },
  { category: "하의", brand: "Nike", product: "에센셜 트레이닝 팬츠", price: "89,000", gender: "남" },
  { category: "신발", brand: "Dr. Martens", product: "제인 메리제인", price: "199,000", gender: "여" },
  { category: "패션잡화", brand: "Porter", product: "데이팩", price: "229,000", gender: "공용" },
];

document.addEventListener("DOMContentLoaded", () => {
  const product_data_Table = document.getElementById("product_data_Table");
  const pagination = document.getElementById("pagination");
  const categorySelect = document.getElementById("inlineFormSelectPref");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const genderSelect = document.getElementById("genderSelect");
  const rowsPerPage = 5;
  let currentPage = 1;
  let filteredData = [...product_data];

  if (!product_data_Table || !pagination) return;

  const applyFilters = () => {
    const categoryValue = categorySelect?.value || "";
    const genderValue = genderSelect?.value || "";
    const keyword = (searchInput?.value || "").trim().toLowerCase();

    filteredData = product_data.filter((item) => {
      const categoryMatch = categoryValue ? item.category === mapCategory(categoryValue) : true;
      const genderMatch = genderValue ? item.gender === mapGender(genderValue) : true;
      const keywordMatch = keyword
        ? item.product.toLowerCase().includes(keyword) ||
          item.brand.toLowerCase().includes(keyword)
        : true;
      return categoryMatch && genderMatch && keywordMatch;
    });

    currentPage = 1;
    renderPage(currentPage);
    renderPagination();
  };

  const mapCategory = (value) => {
    const map = {
      cloth_top: "상의",
      cloth_pants: "하의",
      cloth_shoes: "신발",
      miscellaneous_goods: "패션잡화",
    };
    return map[value] || value;
  };

  const mapGender = (value) => {
    const genderMap = {
      male: "남",
      female: "여",
      unisex: "공용",
    };
    return genderMap[value] || value;
  };

  const renderPage = (pageNumber) => {
    const start = (pageNumber - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(start, start + rowsPerPage);

    product_data_Table.innerHTML = "";
    if (paginatedData.length === 0) {
      const emptyRow = product_data_Table.insertRow();
      const cell = emptyRow.insertCell(0);
      cell.colSpan = 5;
      cell.textContent = "해당 조건에 맞는 상품이 없습니다.";
      cell.className = "empty-row";
      return;
    }

    paginatedData.forEach((item) => {
      const row = product_data_Table.insertRow();
      row.insertCell(0).innerHTML = item.category;
      row.insertCell(1).innerHTML = item.brand;
      row.insertCell(2).innerHTML = item.product;
      row.insertCell(3).innerHTML = item.price;
      row.insertCell(4).innerHTML = item.gender;
    });
  };

  const renderPagination = () => {
    pagination.innerHTML = "";
    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

    const createPageItem = (label, targetPage, { disabled = false, active = false } = {}) => {
      const li = document.createElement("li");
      li.className = "page-item";
      if (disabled) li.classList.add("disabled");
      if (active) li.classList.add("active");

      const button = document.createElement("button");
      button.className = "page-link";
      button.textContent = label;
      button.disabled = disabled;
      button.addEventListener("click", () => {
        if (disabled || targetPage === currentPage) return;
        currentPage = targetPage;
        renderPage(currentPage);
        renderPagination();
      });

      li.appendChild(button);
      pagination.appendChild(li);
    };

    createPageItem("이전", Math.max(1, currentPage - 1), { disabled: currentPage === 1 });

    for (let page = 1; page <= totalPages; page += 1) {
      createPageItem(String(page), page, { active: page === currentPage });
    }

    createPageItem("다음", Math.min(totalPages, currentPage + 1), {
      disabled: currentPage === totalPages,
    });
  };

  if (categorySelect) {
    categorySelect.addEventListener("change", applyFilters);
  }

  if (genderSelect) {
    genderSelect.addEventListener("change", applyFilters);
  }

  if (searchButton) {
    searchButton.addEventListener("click", applyFilters);
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyFilters();
      }
    });
  }

  applyFilters();
});
