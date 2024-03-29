// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // Include the auth module


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
// const firebaseConfig = {
//     apiKey: process.env.APIKEY,
//     authDomain: process.env.AUTHDOAIN,
//     projectId: process.env.PROJECTID,
//     storageBucket: process.env.STORAGEBUCKET,
//     messagingSenderId: process.env.MESSAGINGSENDERID,
//     appId: process.env.APPID,
//     measurementId: process.env.MEASUREMENTID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
// JavaScript code to handle Google Sign-In
const googleSignInBtn = document.getElementById('googleSignInBtn');

googleSignInBtn.addEventListener('click', () => {
    console.log("click google login");
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('Successfully signed in with Google:', user);
            // You can now use 'user' to perform actions or update UI based on the signed-in user.
        })
        .catch((error) => {
            console.error('Google Sign-In Error:', error);
        });
});
console.log("Success config");

const googleSignOutBtn = document.getElementById('googleSignOutBtn');
googleSignOutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            console.log('Sign out');
        })
        .catch((error) => {
            console.log(error);
        });
});

// 當頁面載入完成後
window.onload = function () {
    // 監聽用戶狀態變化
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // 用戶已登入
            document.getElementById('userStatus').innerText = `使用者已登入，UID: ${user.uid}`;
        } else {
            // 用戶未登入
            document.getElementById('userStatus').innerText = '使用者未登入';
        }
    });
};


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
        const page = document.getElementById('Page').value;

        // 使用陣列來存儲 Material，保留設定順序
        const materials = [];

        for (let i = 0; i < materialCount; i++) {
            const check_exist_div = document.getElementById('material-object' + i);
            if (check_exist_div) {
                const material = document.getElementById('Material' + i).value;
                const value = document.getElementById('Value' + i).value;
                const unit = document.getElementById('Unit' + i).value;

                const materialObject = {
                    material: material,
                    value: value,
                    unit: unit,
                };

                // 將 Material 物件添加到陣列中
                materials.push(materialObject);
            }
        }

        const description = document.getElementById('Description').value;

        const dataObject = {
            Name: name,
            Eposide: eposide,
            Page: page,
            Material: materials,
            Description: description,
        };

        console.log(dataObject);

        // Create a new Date object, which represents the current date and time
        const currentDate = new Date();

        // Get individual components of the date and time
        const year = currentDate.getFullYear();      // 4-digit year
        const month = currentDate.getMonth() + 1;     // Month (0-indexed, so add 1)
        const day = currentDate.getDate();            // Day of the month
        const hours = currentDate.getHours().toString().padStart(2, '0');        // Hours (24-hour format), with leading zero
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');    // Minutes, with leading zero
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');    // Seconds, with leading zero
        // Create a formatted string representing the current date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
        const docRef = doc(collection(db, 'userData'), formattedDateTime);
        await setDoc(docRef, {
            timestamp: serverTimestamp(),
            ...dataObject,  // 將整個 dataObject 添加到 Firestore
        });


        // 清空輸入欄位
        document.getElementById('Name').value = '';
        document.getElementById('Page').value = '';
        for (let i = 0; i < materialCount; i++) {
            const check_exist_div = document.getElementById('material-object' + i);
            if (check_exist_div) {
                document.getElementById('Material' + i).value = '';
                document.getElementById('Value' + i).value = '';

                if (i != 0) {
                    var divToDelete = document.getElementById('material-object' + i);
                    if (divToDelete) {
                        divToDelete.remove();
                    } else {
                        console.log('Element not found');
                    }
                }
            }
        }
        document.getElementById('Eposide').value = '';
        document.getElementById('Description').value = '';
        materialCount = 1;
    });
}
async function getUserData() {
    const userDataCollection = collection(db, 'userData');
    const querySnapshot = await getDocs(userDataCollection);
  
    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push(doc.data());
    });
  
    return userData;
  }
  
  // Example: Call the function and log the user data
  getUserData().then((userData) => {
    console.log(userData);
  });
