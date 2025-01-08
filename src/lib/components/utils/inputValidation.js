import { toast } from "@zerodevx/svelte-toast";
import { logErrorToFile } from "../logErrorToFile/logErrorToFile.js";
export async function inputValidation(data, jwt) {
    try{
        const whitelist = /^[a-zA-Z0-9@? \[\]\{\},]*$/;

    function validateValue(value) {
        if (typeof value === 'string') {
            if(whitelist.test(value)){
                logErrorToFile(`Invalid character(s) "${value}"`, jwt);
                return true;
            }else{
                return false;
            }
        } else if (Array.isArray(value)) {
            if(value.every(validateValue)){
                return true;
            }else{
                return false;
            }
        } else if (typeof value === 'object') {
            if(Object.keys(value).every(key => validateValue(value[key]))){
                return true
            }else{
                return false;
            }
        }
        return true; //Returns true if number
    }

    return Object.entries(data).some(([key, value]) => {
        const stringValue = value.toString();

        if (!validateValue(stringValue)) {
            toast.push(`Invalid characters detected: "${stringValue}"`, {
                theme: {
                    "--toastColor": "mintcream",
                    "--toastBackground": "#EC9706",
                    "--toastBarBackground": "#DD571C",
                },
                duration: 2500,
            });
            return true;
        }
        return false;
    });
    }catch(error){
      logErrorToFile(error, jwt);
    }
}