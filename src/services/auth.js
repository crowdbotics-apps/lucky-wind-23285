

import { appConfig } from "../config/app";

export default {
    async headers() {
        return await {
            Accept: "application/json",
            "Content-Type": "application/json"
        };
    },
    async post(url, data, header) {
        return fetch(`${appConfig.baseUrl}${url}`, {
            method: "POST",
            headers: await this.headers(),
            body: data
        });
    },
    async register(data) {
        try {
            const res = await this.post("/api/v1/auth/registration/", data);
            console.log("res auth : ", res)
            return res.json();
        } catch (error) {
            return error
        }
    },
    async login(data) {
        try {
            const res = await this.post("/api/v1/auth/login/", data);
            return res.json();
        } catch (error) {
            
            return error
        }
    },
    async forgot(data) {
        try {
            const res = await this.post("/api/v1/auth/password/reset/", data);
            return res.json();
        } catch (error) {
            
            return error
        }
    },
    async facebookLogin(data) {
        try {
            const res = await this.post("/api/v1/auth/facebook/", data);
            return res.json();
        } catch (error) {
            
            return error
        }
    }
};
