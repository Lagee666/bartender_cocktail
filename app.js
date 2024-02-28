// app.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
let materialCount = 1;

function addMaterialInput() {
    const materialInputsContainer = document.getElementById('materialInputs');

    const new_material_object = document.createElement('div');
    new_material_object.className = 'material-object';
    new_material_object.id = 'material-object';

    // Material
    // 創建新的 div 元素
    const new_material = document.createElement('div');
    new_material.className = 'input-container';

    // 創建 label 元素
    const label_material = document.createElement('label');
    label_material.textContent = 'Material:';
    label_material.setAttribute('for', 'Material' + materialCount);

    // 創建 input 元素
    const input_material = document.createElement('input');
    input_material.type = 'text';
    input_material.id = 'Material' + materialCount;
    input_material.name = 'Material' + materialCount;
    input_material.required = true;

    // Value
    // 創建新的 div 元素
    const new_value = document.createElement('div');
    new_value.className = 'input-container';

    // 創建 label 元素
    const label_value = document.createElement('label');
    label_value.textContent = 'Unit:';
    label_value.setAttribute('for', 'Unit' + materialCount);

    // 創建 input 元素
    const input_value = document.createElement('input');
    input_value.type = 'text';
    input_value.id = 'Value' + materialCount;
    input_value.name = 'Value' + materialCount;
    input_value.required = true;

    // Unit
    // 創建新的 div 元素
    const new_material_unit = document.createElement('div');
    new_material_unit.className = 'input-container';

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
    option3.value = 'other';
    option3.textContent = 'other ';
    input_unit.appendChild(option3);

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

    materialInputsContainer.appendChild(new_material_object);
    // 增加計數以確保下一個 Material 輸入框有不同的 ID
    materialCount++;
}

// // 監聽表單提交事件
// const uploadForm = document.getElementById('uploadForm');

// uploadForm.addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const name = document.getElementById('Name').value;
//     const eposide = document.getElementById('Eposide').value;

//     const dataObject = {
//         Name: name,
//         Eposide: eposide,
//         Material: {}
//     };

//     for (let i = 0; i < materialCount; i++) {
//         const material = document.getElementById('Material' + i).value;
//         const value = document.getElementById('Value' + i).value;
//         const unit = document.getElementById('Unit' + i).value;

//         const value_unit = value + " " + unit;
//         // 添加 Material 到物件中
//         dataObject.Material[material] = value_unit;
//     }
//     const description = document.getElementById('Description').value;

//     dataObject['Description'] = description;

//     console.log(dataObject);

    
//     // 將數據上傳到 Firestore
//     const firebaseConfig = {
//         apiKey: "AIzaSyC58TlDcuOt-OqSITwG5ehI1AEc066N5jA",
//         authDomain: "cocktail-adfa8.firebaseapp.com",
//         projectId: "cocktail-adfa8",
//         storageBucket: "cocktail-adfa8.appspot.com",
//         messagingSenderId: "295930608454",
//         appId: "1:295930608454:web:6da9147968b1d9b51bc347",
//         measurementId: "G-0XPS44LJRJ"
//       };
      
//       // Initialize Firebase
//       const app = initializeApp(firebaseConfig);
//       const analytics = getAnalytics(app);
//       const db = getFirestore(app);
      
//     await addDoc(collection(db, 'userData'), {
//         ...dataObject,  // 將整個 dataObject 添加到 Firestore
//         timestamp: serverTimestamp(),
//     });

//     // 清空輸入欄位
//     document.getElementById('dataInput').value = '';
// });