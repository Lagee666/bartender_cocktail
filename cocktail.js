const upload_page_btn = document.getElementById("UploadPageBtn");
upload_page_btn.addEventListener('click', function () {
    window.location.href = "index.html";
}) 
document.addEventListener('DOMContentLoaded', function () {
    const cocktailDisplay = document.getElementById('cocktailDisplay');

    // 使用 fetch 載入 JSON 檔案
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 將 JSON 數據呈現在畫面上
            renderJson(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    // 呈現 JSON 數據的函數
    function renderJson(data) {
        // 清空先前的內容
        cocktailDisplay.innerHTML = '';

        // 遍歷 JSON 數據並添加到 DOM 中
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<strong>${item.name}</strong>: $${item.price}`;
            cocktailDisplay.appendChild(itemDiv);
        });
    }
});
