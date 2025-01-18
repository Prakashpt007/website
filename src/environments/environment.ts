// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// let baseUrl = "https://dev-uapp-admin-api.cropdata.in/api/v1";
let baseUrl = "https://uapp-dev.cropdata.in:8080/api/v1";
// let baseUrl = "http://139.59.69.150:8087/api/v1";
export const environment = {
	production: false,
	baseUrl: baseUrl,
	allowOrigin: "http://192.168.0.141/:4200"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
