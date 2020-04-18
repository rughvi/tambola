import Firebase from "firebase";
import FirebaseConfig from '../firebase/firebaseconfig.tsx';

class DBContext{
    private db: Firebase.database.Database;
    static instance:DBContext;

    static get Instance(){
        if(this.instance == null){
            this.instance = new DBContext();
            this.instance.Initialize();
        }
        return this.instance;
    }

    
    get IsInitialized(): boolean{
        return !(this.db == null);
    }

    private Initialize(){
        if(!this.db){
            const app = Firebase.initializeApp(FirebaseConfig);
            this.db = app.database();
        }
    }

    get DB(): Firebase.database.Database {
        return this.db;
    }
}

export default DBContext;