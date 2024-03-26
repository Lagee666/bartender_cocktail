var cocktaildata = {};
var liquarList = {};
var checkedItems = [];

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
            cocktaildata = data;
            renderJson(cocktaildata);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
        
    toggleList();
});
// 呈現 JSON 數據的函數
function renderJson(cocktailData) {
    // 清空先前的內容
    cocktailDisplay.innerHTML = '';
    var includeCheckedItemData = checkMaterialIncludeCheckItem(cocktailData);
    console.log(includeCheckedItemData);
    // Assuming cocktailDisplay is an existing HTML element or has been properly defined

    // Check if cocktailDisplay is not undefined or null
    if (cocktailDisplay) {
        // Create the initial row container
        var rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.flexWrap = 'wrap';
        var rowDivCount = 0
        // Iterate through JSON data
        for (item = 0; item < includeCheckedItemData.length; item++) {
            // var notAllInlcude = checkMaterialIncludeCheckItem(cocktailData[item]);
            // if (notAllInlcude && checkedItems.length != 0) {
            //     continue
            // }
            // Check if a new row should be created
            if (rowDivCount > 0 && rowDivCount % 3 === 0) {
                // Append the previous rowDiv to cocktailDisplay
                cocktailDisplay.appendChild(rowDiv);

                // Create a new rowDiv for the next four items
                rowDiv = document.createElement('div');
                rowDiv.style.display = 'flex';
                rowDiv.style.flexWrap = 'wrap';
            }
            rowDivCount++;
            // Create individual itemDiv
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <strong>${includeCheckedItemData[item].Name}</strong>:
            <br>
            第${includeCheckedItemData[item].Eposide}集${includeCheckedItemData[item].Page}頁
            <br>
            Material:
            <ul>
                ${includeCheckedItemData[item].Material.map(material => `
                <li>
                    ${material.material}: ${material.value}${material.unit}
                </li>
                `).join('')}
            </ul>
            Description: 
            ${includeCheckedItemData[item].Description}
        `;

            // Set itemDiv width to 25%
            itemDiv.style.width = '33%';

            // Append itemDiv to the current row container
            rowDiv.appendChild(itemDiv);

        }

        // Append the last rowDiv (if it contains items) to cocktailDisplay
        if (rowDiv.childElementCount > 0) {
            cocktailDisplay.appendChild(rowDiv);
        }

        getLiquarListandCount(includeCheckedItemData);
    } else {
        console.error('Error: cocktailDisplay is not defined or null.');
    }
}

function checkMaterialIncludeCheckItem(data) {
    if (checkedItems.length === 0) {
        return data
    }
    var includeData = [];
    for (item = 0; item < data.length; item++) {
        var materialArray = data[item].Material;
        var materials = materialArray.map(materialItem => materialItem.material);
        var notAllInlcude = false;
        for (i = 0; i < checkedItems.length; i++) {
            if (!materials.includes(checkedItems[i])) {
                notAllInlcude = true;
                break
            }
        }
        if (notAllInlcude) {
            continue
        }
        includeData.push(data[item]);
    }
    
    console.log(includeData);
    return includeData
    // console.log(includeData);
    // var materialArray = data.Material;
    // var materials = materialArray.map(materialItem => materialItem.material);
    // var notAllInlcude = false;
    // for (i = 0; i < checkedItems.length; i++) {
    //     if (!materials.includes(checkedItems[i])) {
    //         notAllInlcude = true;
    //         break
    //     }
    // }
    // if (notAllInlcude && checkedItems.length != 0) {
    //     return notAllInlcude
    // }
    // return false
}

function getLiquarListandCount(data) {
    liquarList = {};
    data.forEach((item, index) => {
        item.Material.forEach((material) => {

            // console.log(material);
            if (liquarList[material.material]) {
                liquarList[material.material]++
            } else {
                liquarList[material.material] = 1;
            }
        })
    })
    sortKV();
    toggleList();
}

var sortLiquarList = [];
function sortKV() {
    // 將 KV 存儲轉換為可排序的數組
    sortLiquarList = [];
    for (var material in liquarList) {
        sortLiquarList.push([material, liquarList[material]]);
    }

    // 根據值的大小對數組進行排序
    sortLiquarList.sort(function (a, b) {
        return b[1] - a[1];
    });
}

function toggleList() {
    var list = document.getElementById("materialList");
    // 當列表被收起時，添加列表項目
    for (var i = 0; i < sortLiquarList.length; i++) {
        (function(item) {
            var listItem = document.createElement("li");
            listItem.textContent = item[0] + '(' + item[1] + ')';
            listItem.onclick = function () {
                this.classList.toggle("checked");
                var index = checkedItems.indexOf(item[0]);
                if (index === -1) {
                    checkedItems.push(item[0]);
                } else {
                    checkedItems.splice(index, 1);
                }
                renderJson(cocktaildata);
            };
            list.appendChild(listItem);
        })(sortLiquarList[i]);
    }
}