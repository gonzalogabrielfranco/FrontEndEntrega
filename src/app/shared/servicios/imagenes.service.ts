import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getStorage , ref,StorageReference,getDownloadURL, uploadBytes,uploadBytesResumable,deleteObject } from "firebase/storage";
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  firebaseConfig = {
    apiKey: "AIzaSyDK7CRWgBzG84-x7p1pL2-pA6Pt6xe7LzI",
    authDomain: "portfolio-d19ef.firebaseapp.com",
    projectId: "portfolio-d19ef",
    storageBucket: "portfolio-d19ef.appspot.com",
    messagingSenderId: "982926611969",
    appId: "1:982926611969:web:bd755aaf20b5b3d7df9200"
  };

  constructor() { }
  subirImagen(filea:File,path:string){
    const app = initializeApp(this.firebaseConfig);
    const storage = getStorage(app);
    const spa =ref(storage, path+filea.name);
    const uploadTask= uploadBytesResumable(spa, filea);
    return uploadTask;
  }
  eliminarImagen(url:string){
    const app = initializeApp(this.firebaseConfig);
    const storage = getStorage(app);
    const desertRef = ref(storage, url);

    deleteObject(desertRef).then(() => {
      console.log("eliminado");

    }).catch((error) => {

    });
  }
}
