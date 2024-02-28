// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC58TlDcuOt-OqSITwG5ehI1AEc066N5jA",
    authDomain: "cocktail-adfa8.firebaseapp.com",
    projectId: "cocktail-adfa8",
    storageBucket: "cocktail-adfa8.appspot.com",
    messagingSenderId: "295930608454",
    appId: "1:295930608454:web:6da9147968b1d9b51bc347",
    measurementId: "G-0XPS44LJRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

console.log("Success config");

// 獲取按鈕元素
const uploadButton = document.getElementById('submit');

// 設定按鈕點擊事件監聽器
uploadButton.addEventListener('click', submit)
function submit() {
    // 監聽表單提交事件
    const uploadForm = document.getElementById('uploadForm');

    uploadForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('Name').value;
        const eposide = document.getElementById('Eposide').value;

        const dataObject = {
            Name: name,
            Eposide: eposide,
            Material: {}
        };

        for (let i = 0; i < materialCount; i++) {
            const material = document.getElementById('Material' + i).value;
            const value = document.getElementById('Value' + i).value;
            const unit = document.getElementById('Unit' + i).value;

            const value_unit = value + " " + unit;
            // 添加 Material 到物件中
            dataObject.Material[material] = value_unit;
        }
        const description = document.getElementById('Description').value;

        dataObject['Description'] = description;

        console.log(dataObject);

        await addDoc(collection(db, 'userData'), {
            ...dataObject,  // 將整個 dataObject 添加到 Firestore
            timestamp: serverTimestamp(),
        });

        // 清空輸入欄位
        document.getElementById('Name').value = '';
        document.getElementById('Eposide').value = '';
        document.getElementById('Description').value = '';
    });
}