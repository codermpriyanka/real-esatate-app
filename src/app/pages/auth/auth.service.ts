import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject=new BehaviorSubject<any>(null)
  user$=this.userSubject.asObservable()
  private loginModal=new BehaviorSubject<boolean>(false)
  loginModal$=this.loginModal.asObservable()

  private signupModal= new BehaviorSubject<boolean>(false)
  signupModal$=this.signupModal.asObservable()

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore  ) { 
    const user=sessionStorage.getItem('user')
    if(user){
      const parsedUser=JSON.parse(user)
      this.userSubject.next(parsedUser)
    }
  }
openLogin(){
  this.signupModal.next(false)
  this.loginModal.next(true)
}
openSignup(){
  this.signupModal.next(true)
  this.loginModal.next(false)
}
closeAll(){
  this.signupModal.next(false)
  this.loginModal.next(false)
}
//Fire Base implementation
async signup(email: string, password: string, role: string) {
  const userCredential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

//stored data in local storage
  const userData = {
    uid: userCredential.user.uid,
    email: email,
    role: role, 
  };

  await this.firestore.collection('users').doc(userData.uid).set(userData);

  return userData;
}
async login(email: string, password: string) {
  const userCredential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  const uid = userCredential.user.uid;
  const doc= await this.firestore.collection('users').doc(uid).ref.get()
  const userData:any= doc.data()
  if(!userData){
    throw new Error('User not found in Database')
  }
const finalUser={
  uid:uid,
  ...userData
}

 sessionStorage.setItem('user',JSON.stringify(finalUser))
 this.userSubject.next(finalUser)
 return finalUser
}
logOut(){
  this.afAuth.auth.signOut();
  sessionStorage.removeItem('user')
  this.userSubject.next(null)
}
} 
