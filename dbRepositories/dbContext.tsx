import Firebase from "firebase";
import FirebaseConfig from '../firebase/firebaseconfig.tsx';

class DBContext{
    private _db: Firebase.database.Database;
    static _instance:DBContext;

    private constructor(){

    }

    static get Instance(){
        if(this._instance == null){
            this._instance = new DBContext();
            this._instance.Initialize();
        }
        return this._instance;
    }

    
    get IsInitialized(): boolean{
        return !(this._db == null);
    }

    private Initialize(){
        if(!this._db){
            var app = Firebase.initializeApp(FirebaseConfig);
            this._db = app.database();
        }
    }

    get DB(): Firebase.database.Database {
        return this._db;
    }
}

export default DBContext;