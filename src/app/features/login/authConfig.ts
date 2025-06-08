import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "a29261ea-90fd-4dfc-93cb-18eeabd6fa26",
        authority: "https://activityRegistrator.b2clogin.com/activityRegistrator.onmicrosoft.com/B2C_1_ActivityRegistratorSignInSignUp",
        redirectUri: "http://localhost:4200",
        knownAuthorities: ["activityRegistrator.b2clogin.com"]
    },
    cache: {
        cacheLocation: "sessionStorage", // or local storage
        storageAuthStateInCookie: true
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string) => {
                console.log(message);
            },
            logLevel: LogLevel.Info,
            piiLoggingEnabled: false,
        },
    },
};
