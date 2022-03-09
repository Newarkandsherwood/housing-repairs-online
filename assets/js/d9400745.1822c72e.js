"use strict";(self.webpackChunkhousing_repairs_online=self.webpackChunkhousing_repairs_online||[]).push([[576],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),u=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d=function(e){var n=u(e.components);return r.createElement(l.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=u(t),m=a,f=c["".concat(l,".").concat(m)]||c[m]||p[m]||o;return t?r.createElement(f,s(s({ref:n},d),{},{components:t})):r.createElement(f,s({ref:n},d))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=c;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var u=2;u<o;u++)s[u]=t[u];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},9743:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return u},assets:function(){return d},toc:function(){return p},default:function(){return m}});var r=t(7462),a=t(3366),o=(t(7294),t(3905)),s=["components"],i={sidebar_position:1},l="Addresses",u={unversionedId:"housing-management-system-api/endpoints/addresses",id:"housing-management-system-api/endpoints/addresses",title:"Addresses",description:"GET: /addresses",source:"@site/docs/housing-management-system-api/endpoints/addresses.md",sourceDirName:"housing-management-system-api/endpoints",slug:"/housing-management-system-api/endpoints/addresses",permalink:"/housing-repairs-online/docs/housing-management-system-api/endpoints/addresses",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/housing-management-system-api/endpoints/addresses.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Endpoints",permalink:"/housing-repairs-online/docs/category/endpoints-2"},next:{title:"Alerting & Montoring",permalink:"/housing-repairs-online/docs/alerting-and-monitoring/intro"}},d={},p=[{value:"GET: <code>/addresses</code>",id:"get-addresses",level:2},{value:"Request:",id:"request",level:3},{value:"Authorization",id:"authorization",level:4},{value:"Query Params",id:"query-params",level:4},{value:"Response:",id:"response",level:3}],c={toc:p};function m(e){var n=e.components,t=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"addresses"},"Addresses"),(0,o.kt)("h2",{id:"get-addresses"},"GET: ",(0,o.kt)("inlineCode",{parentName:"h2"},"/addresses")),(0,o.kt)("h3",{id:"request"},"Request:"),(0,o.kt)("h4",{id:"authorization"},"Authorization"),(0,o.kt)("p",null,"Bearer Token ",(0,o.kt)("inlineCode",{parentName:"p"},"<token>")),(0,o.kt)("h4",{id:"query-params"},"Query Params"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Key"),(0,o.kt)("th",{parentName:"tr",align:null},"Example value"),(0,o.kt)("th",{parentName:"tr",align:null},"Required"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"postcode"),(0,o.kt)("td",{parentName:"tr",align:null},"M3 0W"),(0,o.kt)("td",{parentName:"tr",align:null},"\u2705")))),(0,o.kt)("h3",{id:"response"},"Response:"),(0,o.kt)("p",null,"List of found addresses"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'[\n    {\n        "reference": {\n            "id": "53660010",\n            "description": null,\n            "allocatedBy": "Universal Housing"\n        },\n        "postbox": null,\n        "room": null,\n        "department": null,\n        "floor": null,\n        "plot": null,\n        "buildingNumber": "1 Cute Street",\n        "buildingName": null,\n        "complexName": null,\n        "streetName": null,\n        "cityName": null,\n        "country": null,\n        "addressLine": null,\n        "type": null,\n        "postalCode": "M3 0W"\n    },\n    {\n        "reference": {\n            "id": "53660020",\n            "description": null,\n            "allocatedBy": "Universal Housing"\n        },\n        "postbox": null,\n        "room": null,\n        "department": null,\n        "floor": null,\n        "plot": null,\n        "buildingNumber": "2 Cute Street",\n        "buildingName": null,\n        "complexName": null,\n        "streetName": null,\n        "cityName": null,\n        "country": null,\n        "addressLine": [\n            "Cute Street 2"\n        ],\n        "type": null,\n        "postalCode": "M3 0W"\n    }\n]\n')))}m.isMDXComponent=!0}}]);