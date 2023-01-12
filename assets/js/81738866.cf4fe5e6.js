"use strict";(self.webpackChunkhousing_repairs_online=self.webpackChunkhousing_repairs_online||[]).push([[2054],{3905:function(t,e,n){n.d(e,{Zo:function(){return u},kt:function(){return N}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var d=a.createContext({}),p=function(t){var e=a.useContext(d),n=e;return t&&(n="function"==typeof t?t(e):l(l({},e),t)),n},u=function(t){var e=p(t.components);return a.createElement(d.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,d=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),m=p(n),N=r,c=m["".concat(d,".").concat(N)]||m[N]||s[N]||i;return n?a.createElement(c,l(l({ref:e},u),{},{components:n})):a.createElement(c,l({ref:e},u))}));function N(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var d in e)hasOwnProperty.call(e,d)&&(o[d]=e[d]);o.originalType=t,o.mdxType="string"==typeof t?t:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4109:function(t,e,n){n.r(e),n.d(e,{assets:function(){return d},contentTitle:function(){return l},default:function(){return s},frontMatter:function(){return i},metadata:function(){return o},toc:function(){return p}});var a=n(3117),r=(n(7294),n(3905));const i={},l="Scheduling API",o={unversionedId:"scheduling-api/intro",id:"scheduling-api/intro",title:"Scheduling API",description:"GitHub Repository",source:"@site/docs/scheduling-api/intro.md",sourceDirName:"scheduling-api",slug:"/scheduling-api/intro",permalink:"/housing-repairs-online/scheduling-api/intro",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/scheduling-api/intro.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"SoR Engine",permalink:"/housing-repairs-online/repairs-api/sor-engine"},next:{title:"Endpoints",permalink:"/housing-repairs-online/category/endpoints-1"}},d={},p=[{value:"Frameworks used",id:"frameworks-used",level:2},{value:"Environment variables",id:"environment-variables",level:2},{value:"Health Checks",id:"health-checks",level:2}],u={toc:p};function s(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"scheduling-api"},"Scheduling API"),(0,r.kt)("a",{class:"badge badge--secondary",href:"https://github.com/City-of-Lincoln-Council/HousingRepairsSchedulingApi"},"GitHub Repository"),(0,r.kt)("h2",{id:"frameworks-used"},"Frameworks used"),(0,r.kt)("p",null,"Written in .Net"),(0,r.kt)("h2",{id:"environment-variables"},"Environment variables"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"APP_SERVICE_NAME")),(0,r.kt)("td",{parentName:"tr",align:null},"Service name (must be unqiue across whole of Azure) e.g. ",(0,r.kt)("inlineCode",{parentName:"td"},"housing-repairs-scheduling-api-{LOCAL_AUTHORITY_NAME}"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AUTHENTICATION_IDENTIFIER_PRODUCTION")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique identifier used to validate access used to validate access in production.*")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AUTHENTICATION_IDENTIFIER_STAGING")),(0,r.kt)("td",{parentName:"tr",align:null},"A unique identifier used to validate access used to validate access in staging.*")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"AZURE_AD_TENANT_ID")),(0,r.kt)("td",{parentName:"tr",align:null},"This is the Directory (tenant) ID")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_API_ADDRESS_PRODUCTION")),(0,r.kt)("td",{parentName:"tr",align:null},"Live/production DRS API address, e.g. ",(0,r.kt)("inlineCode",{parentName:"td"},"https://yourserver/OTWebServiceGateway_INSTANCENAME/ws/soap?wsdl"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_API_ADDRESS_STAGING")),(0,r.kt)("td",{parentName:"tr",align:null},"Test/staging DRS API address, e.g. ",(0,r.kt)("inlineCode",{parentName:"td"},"https://yourserver/OTWebServiceGateway_INSTANCENAME/ws/soap?wsdl"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_CONTRACT_PRODUCTION")),(0,r.kt)("td",{parentName:"tr",align:null},"Contract value to use when making requests to DRS in production")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_CONTRACT_STAGING")),(0,r.kt)("td",{parentName:"tr",align:null},"Contract value to use when making requests to DRS in staging")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_LOGIN_PRODUCTION")),(0,r.kt)("td",{parentName:"tr",align:null},"DRS login/user name in production")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_LOGIN_STAGING")),(0,r.kt)("td",{parentName:"tr",align:null},"DRS login/user name in staging")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_PASSWORD_PRODUCTION")),(0,r.kt)("td",{parentName:"tr",align:null},"DRS password in production")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_PASSWORD_STAGING")),(0,r.kt)("td",{parentName:"tr",align:null},"DRS password in staging")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_PRIORITY_PRODUCTION")),(0,r.kt)("td",{parentName:"tr",align:null},"Priority to use when making requests to DRS in production")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DRS_PRIORITY_STAGING")),(0,r.kt)("td",{parentName:"tr",align:null},"Priority to use when making requests to DRS in staging")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"JWT_SECRET_PRODUCTION")),(0,r.kt)("td",{parentName:"tr",align:null},"JWT secret generated for production.*")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"JWT_SECRET_STAGING")),(0,r.kt)("td",{parentName:"tr",align:null},"JWT secret generated for staging.*")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"NUGET_AUTH_GITHUB_TOKEN")),(0,r.kt)("td",{parentName:"tr",align:null},"Authentication token for authenticating with GitHub NuGet feed")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"NUGET_AUTH_GITHUB_USERNAME")),(0,r.kt)("td",{parentName:"tr",align:null},"Username for authenticating with GitHub NuGet feed")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"RESOURCE_GROUP_LOCATION")),(0,r.kt)("td",{parentName:"tr",align:null},"Azure Resource Group location, e.g. ",(0,r.kt)("inlineCode",{parentName:"td"},"UK South"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"RESOURCE_GROUP_NAME")),(0,r.kt)("td",{parentName:"tr",align:null},"Azure Resource Group name")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"SENTRY_DSN")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://docs.sentry.io/product/sentry-basics/dsn-explainer/"},"Sentry Data Source Name"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"SERVICE_PLAN_NAME")),(0,r.kt)("td",{parentName:"tr",align:null},"Service plan name (must be unique across whole of Azure) e.g. ",(0,r.kt)("inlineCode",{parentName:"td"},"housing-repairs-schduling-api-{LOCAL_AUTHORITY_NAME}"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"STATE_CONTAINER_NAME")),(0,r.kt)("td",{parentName:"tr",align:null},"The name of the container to store Terraform state in")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"STATE_KEY_NAME")),(0,r.kt)("td",{parentName:"tr",align:null},"The file path and name of your Terraform state file")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"STORAGE_ACCOUNT_NAME")),(0,r.kt)("td",{parentName:"tr",align:null},"Storage account name for Terraform state, e.g. ",(0,r.kt)("inlineCode",{parentName:"td"},"housing-repairs-online"))))),(0,r.kt)("p",null,"*"," See ",(0,r.kt)("a",{parentName:"p",href:"../apis/authentication"},"Authentication")," for more details."),(0,r.kt)("h2",{id:"health-checks"},"Health Checks"),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"../apis/health-checks"},"Health Checks")," for details."),(0,r.kt)("p",null,"The API is determined to be health if:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"It can ",(0,r.kt)("em",{parentName:"li"},"see/reach")," the configured DRS host")),(0,r.kt)("p",null,"DRS doesn't have a health check endpoint and so a ping check was determined to be the best option."),(0,r.kt)("p",null,"Due to Azure disabling regular ping operations, TCP ping has been used instead."))}s.isMDXComponent=!0}}]);