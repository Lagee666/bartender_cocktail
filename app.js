// app.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
let materialCount = 1;
const autoFillInDiv = document.getElementById('auto-fill-in');

// Listen autoFillInDiv
autoFillInDiv.addEventListener('click', function (event) {
    // 檢查點擊元素是否為段落
    if (event.target.tagName === 'P') {
        // 自動輸入內容
        for (i = 0; i < materialCount; i++) {
            const material_text = document.getElementById('Material' + i);
            if (material_text) {
                if (material_text.value.trim() === '') {
                    material_text.value = event.target.innerText;
                    return
                }
            }
        }
        addMaterialInput(event.target.innerText);
    }
});
function addMaterialInput(material) {
    const materialInputsContainer = document.getElementById('materialInputs');

    const new_material_object = document.createElement('div');
    new_material_object.className = 'material-object';
    new_material_object.id = 'material-object' + materialCount;

    // Material
    // 創建新的 div 元素
    const new_material = document.createElement('div');
    new_material.className = 'material-container';

    // 創建 label 元素
    const label_material = document.createElement('label');
    label_material.textContent = 'Material:';
    label_material.setAttribute('for', 'Material' + materialCount);

    // 創建 input 元素
    const input_material = document.createElement('input');
    input_material.type = 'text';
    input_material.id = 'Material' + materialCount;
    input_material.name = 'Material' + materialCount;
    input_material.value = material
    input_material.required = true;

    // Value
    // 創建新的 div 元素
    const new_value = document.createElement('div');
    new_value.className = 'value-container';

    // 創建 label 元素
    const label_value = document.createElement('label');
    label_value.textContent = 'Value:';
    label_value.setAttribute('for', 'Value' + materialCount);

    // 創建 input 元素
    const input_value = document.createElement('input');
    input_value.type = 'text';
    input_value.id = 'Value' + materialCount;
    input_value.name = 'Value' + materialCount;
    input_value.required = false;

    // Unit
    // 創建新的 div 元素
    const new_material_unit = document.createElement('div');
    new_material_unit.className = 'unit-container';

    // 創建 label 元素
    const label_unit = document.createElement('label');
    label_unit.textContent = 'Unit:';
    label_unit.setAttribute('for', 'Unit' + materialCount);

    // 創建 input 元素
    const input_unit = document.createElement('select');
    input_unit.id = 'Unit' + materialCount;
    input_unit.name = 'Unit' + materialCount;

    const option1 = document.createElement('option');
    option1.value = 'ml';
    option1.textContent = 'ml ';
    input_unit.appendChild(option1);
    const option2 = document.createElement('option');
    option2.value = 'dash';
    option2.textContent = 'dash ';
    input_unit.appendChild(option2);
    const option3 = document.createElement('option');
    option3.value = '';
    option3.textContent = '';
    input_unit.appendChild(option3);

    // delete_material

    const btn_delete = document.createElement('button');

    btn_delete.textContent = 'Delete';
    btn_delete.className = 'button-delete'
    btn_delete.addEventListener('click', function () {
        materialInputsContainer.removeChild(new_material_object);
    });

    // 將 label 和 input 添加到新的 div 元素中
    new_material.appendChild(label_material);
    new_material.appendChild(input_material);

    new_value.appendChild(label_value);
    new_value.appendChild(input_value);

    new_material_unit.appendChild(label_unit);
    new_material_unit.appendChild(input_unit);

    // 將新的 div 元素添加到容器中
    new_material_object.appendChild(new_material);
    new_material_object.appendChild(new_value);
    new_material_object.appendChild(new_material_unit);
    new_material_object.appendChild(btn_delete);

    materialInputsContainer.appendChild(new_material_object);
    // 增加計數以確保下一個 Material 輸入框有不同的 ID
    materialCount++;
}

const home_page_btn = document.getElementById("HomePageBtn");
home_page_btn.onclick = function() {
    window.location.href = "cocktail.html";
};
