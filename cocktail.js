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

// Assuming cocktailDisplay is an existing HTML element or has been properly defined

// Check if cocktailDisplay is not undefined or null
if (cocktailDisplay) {
    // Create the initial row container
    var rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    rowDiv.style.flexWrap = 'wrap';

    // Iterate through JSON data
    data.forEach((item, index) => {
        // Check if a new row should be created
        if (index > 0 && index % 4 === 0) {
            // Append the previous rowDiv to cocktailDisplay
            cocktailDisplay.appendChild(rowDiv);
            
            // Create a new rowDiv for the next four items
            rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.flexWrap = 'wrap';
        }

        // Create individual itemDiv
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <strong>${item.Name}</strong>:
            <br>
            第${item.Eposide}集${item.Page}頁
            <br>
            Material:
            <ul>
                ${item.Material.map(material => `
                <li>
                    ${material.material}: ${material.value}${material.unit}
                </li>
                `).join('')}
            </ul>
            Description: 
            ${item.Description}
        `;

        // Set itemDiv width to 25%
        itemDiv.style.width = '25%';

        // Append itemDiv to the current row container
        rowDiv.appendChild(itemDiv);
    });

    // Append the last rowDiv (if it contains items) to cocktailDisplay
    if (rowDiv.childElementCount > 0) {
        cocktailDisplay.appendChild(rowDiv);
    }
} else {
    console.error('Error: cocktailDisplay is not defined or null.');
}

        // data.forEach(item => {
        //     const itemDiv = document.createElement('div');
        //     itemDiv.innerHTML = `
        //         <strong>${item.Name}</strong>:
        //         <br>
        //         第${item.Eposide}集${item.Page}頁
        //         <br>
        //         Material:
        //         <ul>
        //             ${item.Material.map(material => `
        //             <li>
        //                 ${material.material}: ${material.value}${material.unit}
        //             </li>
        //             `).join('')}
        //         </ul>
        //         Description: ${item.Description}
        //         `;
        //     cocktailDisplay.appendChild(itemDiv);
        // });
    }
});
