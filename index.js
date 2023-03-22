// Import the functions you need from the SDKs you need


import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore,collection,setDoc,doc,addDoc,getDoc,getDocs,updateDoc,deleteDoc, query, where} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBKH627TpzFJeDdbcDNpfxdgfC1nAUReLc",
  authDomain: "space-invaders-ffb81.firebaseapp.com",
  projectId: "space-invaders-ffb81",
  storageBucket: "space-invaders-ffb81.appspot.com",
  messagingSenderId: "769164341345",
  appId: "1:769164341345:web:d2ba8506150f8c75067a20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);




 async function AddDocumentCustomId(){
   var name=document.getElementById("exampleInputEmail1").value;
   var handle=document.getElementById("exampleInputPassword1").value;
    
//    const number = str.slice(-2); 
// const str = "Game Over : 200";



var str=document.getElementById("Sc").innerHTML;
const index = str.indexOf(":");
const number = str.slice(index + 2);

console.log(name,handle,number);

    // const docRef = await addDoc(collection(db, "Records"), {
    //     Name: name ,
    //     Tag: handle,
    //     Score:number
    //   });










      let d=new Date();


    //   await setDoc(doc(db, "Records", str), {
    //     Name: name ,
    //     Tag: handle,
    //     Score:number
    //   });
      
    // var ref=doc(db,"Records",str);
    // const docRef= await setDoc(ref,{
        
    //     Name: name ,
    //        Tag: handle,
    //         Score:number
    // })
    
    
    
    // .then(()=>{
    // alert("ADDED Successfully");
    // })
    // .catch((error)=>{
    // alert("no"+error);
    // });
    


    var ref=collection(db,"Records");
    const docRef= await addDoc(ref,{
      
        Name: name ,
           Tag: handle,
             Score:number
    })
    
    
    
    .then(()=>{
    alert("ADDED Successfully");
    })
    .catch((error)=>{
    alert("no"+error);
    });
    
    

  }
// }
// var btn=document.getElementById("sub");
// btn.addEventListener("click",AddDocumentCustomId);


async function GetData() {

  var str=document.getElementById("Sc").innerHTML;
  const index = str.indexOf(":");




  const number = str.slice(index + 2);


  const querySnapshot = await getDocs(collection(db, "Records"));
  let nu;
  const data = [];
  querySnapshot.forEach((doc) => {
    const record = doc.data();
    data.push(record);
    if (!nu || record.High_Score > nu.High_Score) {
      nu = record;
    }
  });
  const ma = (Math.max(number, nu ? nu.High_Score : -Infinity));
  console.log(ma); // should output the maximum value between number and the highest score in Firestore
  if (ma != nu.High_Score) {
    const ref = collection(db, "Records");
    const docRef = await addDoc(ref, {
      High_Score: ma,
    });
    console.log("ADDED Successfully");
    alert("New High Score 🎉🎉");
  }
  document.getElementById("Hs").innerHTML = `High Score: ${ma}`;
  
  querySnapshot.forEach((doc) => {
    const record = doc.data();
    if (record.High_Score < ma) {
      deleteDoc(doc.ref).then(() => {
        console.log("Record deleted successfully");
      }).catch((error) => {
        console.error("Error deleting record: ", error);
      });
    }
  });

}


  // const number = str.slice(index + 2);

//   const querySnapshot = await getDocs(collection(db, "Records"));
//   const data = [];
//   querySnapshot.forEach((doc) => {
//     data.push(doc.data());
//   });
//   console.log(data); 


// data=parseInt(data);
//   const number = parseInt(str.slice(index + 2), 10);
//   // const querySnapshot = await getDocs(collection(db, "Records"));
//   let nu;
//   querySnapshot.forEach((doc) => {
//     const data = doc.data();
//     console.log(doc.id, " => ", data);
//     if (!nu || data.High_Score > nu.High_Score) {
//       nu = data;
//     }
//   });
//   const ma = Math.max(number, nu ? nu.High_Score : -Infinity);
//   console.log(ma); // should output the maximum value between number and the highest score in Firestore
  



// //   const querySnapshot = await getDocs(collection(db, "Records"));
// //   var nu;
// //   querySnapshot.forEach((doc) => {
// //     // doc.data() is never undefined for query doc snapshots
// //     console.log(doc.id, " => ", doc.data());
// //     nu=doc.data();
// //   });



// // var ma;
// // if(nu>number) ma=nu;
// // else ma=number;
// if(ma!=nu){

//   var ref=collection(db,"Records");
//     const docRef= await addDoc(ref,{
//       High_Score:ma
//     })
    
    
    
//     .then(()=>{
//     alert("ADDED Successfully");
//     })
//     .catch((error)=>{
//     alert("no"+error);
//     });
    
// }




//   document.getElementById("Hs").innerHTML=`"High Score: "${ma}`;
  


var get=document.getElementById("rec");
get.addEventListener("click",GetData);



