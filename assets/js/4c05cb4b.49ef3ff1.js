"use strict";(self.webpackChunkhousing_repairs_online=self.webpackChunkhousing_repairs_online||[]).push([[6933],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(r),m=i,f=d["".concat(p,".").concat(m)]||d[m]||l[m]||a;return r?n.createElement(f,o(o({ref:t},u),{},{components:r})):n.createElement(f,o({ref:t},u))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<a;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1834:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return o},default:function(){return l},frontMatter:function(){return a},metadata:function(){return s},toc:function(){return c}});var n=r(3117),i=(r(7294),r(3905));const a={},o="Application Security",s={unversionedId:"application-security/intro",id:"application-security/intro",title:"Application Security",description:"Storing and Retrieving Application Secrets",source:"@site/docs/application-security/intro.md",sourceDirName:"application-security",slug:"/application-security/intro",permalink:"/housing-repairs-online/application-security/intro",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/application-security/intro.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Scheduled Repairs Based on Area",permalink:"/housing-repairs-online/spikes/scheduled-repairs"},next:{title:"Architecture Descision Records",permalink:"/housing-repairs-online/decisions/"}},p={},c=[{value:"Storing and Retrieving Application Secrets",id:"storing-and-retrieving-application-secrets",level:2},{value:"Environment: Azure",id:"environment-azure",level:3},{value:"Mitigations",id:"mitigations",level:4},{value:"Secrets Store Setup (Azure Key Vault) for App Service",id:"secrets-store-setup-azure-key-vault-for-app-service",level:5}],u={toc:c};function l(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"application-security"},"Application Security"),(0,i.kt)("h2",{id:"storing-and-retrieving-application-secrets"},"Storing and Retrieving Application Secrets"),(0,i.kt)("h3",{id:"environment-azure"},"Environment: Azure"),(0,i.kt)("p",null,"When using Azure and Github actions, care should be taken to not run github actions in debug mode as the ",(0,i.kt)("inlineCode",{parentName:"p"},"azure/webapps-deploy@v2")," function required to deploy the app to azure will print out all the values saved in the App service configuration settings as the result of an internal method called ",(0,i.kt)("inlineCode",{parentName:"p"},"getAppSettings"),"."),(0,i.kt)("p",null,"There is a risk if any of the App service configuration values are sensitive because they would be printed into the github actions log if the workflow is run in debug mode."),(0,i.kt)("h4",{id:"mitigations"},"Mitigations"),(0,i.kt)("h5",{id:"secrets-store-setup-azure-key-vault-for-app-service"},"Secrets Store Setup (Azure Key Vault) for App Service"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Register the Microsoft.ManagedIdentity and Microsoft.KeyVault resource providers to your subscription\nThe Azure Subsctription must be registered to use the following namespaces:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"'Microsoft.ManagedIdentity'")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"'Microsoft.KeyVault'"))),(0,i.kt)("p",{parentName:"li"},"If these are not registered, when trying to create the terraform resources for the key vault and managed identity that would have permissions to access it, the terraform code will fail:"),(0,i.kt)("p",{parentName:"li"},"For example,"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-text"},'keyvault.VaultsClient#CreateOrUpdate: Failure sending request: StatusCode=409 -- Original Error: Code="MissingSubscriptionRegistration" Message="The subscription is not registered to use namespace \'Microsoft.KeyVault\'.\n')),(0,i.kt)("p",{parentName:"li"},"The terraform attribute ",(0,i.kt)("inlineCode",{parentName:"p"},"skip_provider_registration = true")," ",(0,i.kt)("strong",{parentName:"p"},"does not skip")," the need to register ",(0,i.kt)("inlineCode",{parentName:"p"},"Microsoft.ManagedIdentity")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Microsoft.KeyVault"),". These will still need to be registered regardless and will fail the build if they aren't."),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"NOTE: To manage resource provider registrations, the service principal that is used to provision the infrastructure must have the correct permissions to do so."))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Create the key vault, access policy and a user managed identity for each App service.\nThe key vault cannot be accessed by app service without using an identity that has the permissions to access the key vault. Set the desired permissions within the key access policy, add it to the user managed identity and add the identity to the relevant app service."),(0,i.kt)("p",{parentName:"li"},"Best practice is to have a key vault per application, per environment to reduce the incident area if there was breach. See ",(0,i.kt)("a",{parentName:"p",href:"https://docs.microsoft.com/en-gb/azure/key-vault/general/best-practices"},"here"),"."))))}l.isMDXComponent=!0}}]);