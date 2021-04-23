
import { action, observable } from 'mobx';
import Auth from "../services/auth";
import { getServerError } from '../utils/helpers';

import { StorageUtils } from '../utils/storage';


import {navigate} from '../navigator/NavigationService'

export class UserStore {
    @action async register(data) {
        try {
            let response = await Auth.register(data)
            console.log("REGISTER RESPONSE : ", response)
            if(response && response.detail){
                return {error: false, message: "Verification email has been sent, kindly check your email"}
            }else{
                var serverError = getServerError(response)
                console.log("SERVER ERROR : ", serverError)
                return { error: true, message: serverError || "Sorry something went wrong, please try again." }
            }
        } catch (e) {
            console.log("NETWORK ERROR : ", e)
            return { error: true, message: "Sorry something went wrong, please try again." }
        }
    }
    @action async login(data) {
        try {
            let response = await Auth.login(data)
            console.log("LOGIN RESPONSE : ", response)
            if(response && response.key){
                StorageUtils.setAccessToken(response.key);
                navigate("Home")
                return {error: false, message: ""}
            }else{
                var serverError = getServerError(response)
                return { error: true, message: serverError || "Sorry something went wrong, please try again." }
            }
        } catch (e) {
            console.log("NETWORK ERROR : ", e)
            return { error: true, message: "Sorry something went wrong, please try again." }
        }
    }
    @action async forgot(data) {
        try {
            let response = await Auth.forgot(data)
            console.log("LOGIN RESPONSE : ", response)
            if(response && response.detail){
                return {error: false, message: "A Password reset link has been sent to your email"}
            }else{
                var serverError = getServerError(response)
                return { error: true, message: serverError || "Sorry something went wrong, please try again." }
            }
        } catch (e) {
            console.log("NETWORK ERROR : ", e)
            return { error: true, message: "Sorry something went wrong, please try again." }
        }
    }
    
}

export const userStore = new UserStore();