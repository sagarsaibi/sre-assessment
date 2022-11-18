
import {v4 as uuidv4} from 'uuid';

class Common {

   /**
   * Generate UUID to fetch non created item
   * @returns UUID of version 4
   * 
   */
    generateUUID(){
        return uuidv4()
    }

    
    /**
    * Generate random description string to create items
    * @returns a string of seven characters
    */
    generateRandomDesc(){
        return  (Math.random() + 1).toString(36).substring(7);
    }
}

export const common = new Common()