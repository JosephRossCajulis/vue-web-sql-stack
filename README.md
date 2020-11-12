# vuewebsqlstack
Vue.js-WebAPI-SQL Stack Sample Solution

This is a example of a Vue.js-WebAPI-SQL Stack wherein the frontend view is developed using Vue.JS, the REST endpoints are created via ASP.NET WebAPI,
and the data store uses Microsoft SQL Server.

The model is abstracted via an ADO.NET EF Data Model.

Notes:

-FrontEnd files are in the folder called Vue
-FrontEnd only referenced to Vue, Vue-Router and Axios scripts via CDN. Didn't used NPM so that folder size will be lightweight.
-To test the frontend, the solution must run under Debug or Release mode.
-As of 11/12/2020, only HTTP Get is indicated in the WebAPI. POST, PUT and DELETE will be updated later on.
