import { Platform } from "react-native";


export const buttonStyle = Platform.OS !== 'web' ? 'w-full mt-7' : 'w-2/4 mt-7';

export const containerStyle = Platform.OS === 'web'
? 'w-full md:w-3/4 justify-center h-full px-4 my-24 mx-auto'
: 'w-full justify-center h-full px-4 my-6';

export const signupText = Platform.OS !== 'web' ? 'flex justify-center pt-5 flex-row gap-2' 
: "flex pt-5 flex-row gap-2";

export const fieldWidth = Platform.OS !== 'web' ? `w-full h-16 px-4 bg-black-100 rounded-2xl 
     border-2 border-black-200 focus:border-secondary 
     flex flex-row items-center` : `w-2/4 h-16 px-4 bg-black-100 rounded-2xl 
     border-2 border-black-200 focus:border-secondary 
     flex flex-row items-center`;