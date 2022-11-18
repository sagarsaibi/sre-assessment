
import {v4 as uuidv4} from 'uuid';

class Common {

    generateUUID(){

        let uuid = uuidv4();

        console.log('Your UUID is: ' + uuid);
        return uuid;
    }

    generateRandomDesc(){
        let r = (Math.random() + 1).toString(36).substring(7);
        console.log("RANDOM STRING IS "+ r)
        return r;
        //return (Math.random() + 1).toString(36).substring(10) //"asdlakfjda82a4668-59bd-44f6-8283-888c8029f3de";
    }
}

export const common = new Common()