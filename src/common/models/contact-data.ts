export const localPhoneNumber: string = "0525696806"; 
export const internationalPhoneNumber: string = "972" + localPhoneNumber.slice(1);
export const readableLocalPhoneNUmber: string = localPhoneNumber.slice(0, 3) + "-" + localPhoneNumber.slice(3);