"use strict";(self.webpackChunkhousing_repairs_online=self.webpackChunkhousing_repairs_online||[]).push([[2026],{3905:function(n,e,t){t.d(e,{Zo:function(){return p},kt:function(){return N}});var r=t(7294);function a(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){a(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function l(n,e){if(null==n)return{};var t,r,a=function(n,e){if(null==n)return{};var t,r,a={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}var s=r.createContext({}),c=function(n){var e=r.useContext(s),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},p=function(n){var e=c(n.components);return r.createElement(s.Provider,{value:e},n.children)},d={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(n,e){var t=n.components,a=n.mdxType,o=n.originalType,s=n.parentName,p=l(n,["components","mdxType","originalType","parentName"]),u=c(t),N=a,g=u["".concat(s,".").concat(N)]||u[N]||d[N]||o;return t?r.createElement(g,i(i({ref:e},p),{},{components:t})):r.createElement(g,i({ref:e},p))}));function N(n,e){var t=arguments,a=e&&e.mdxType;if("string"==typeof n||a){var o=t.length,i=new Array(o);i[0]=u;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=n,l.mdxType="string"==typeof n?n:a,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3638:function(n,e,t){t.r(e),t.d(e,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return p},toc:function(){return d},default:function(){return N}});var r=t(7462),a=t(3366),o=(t(7294),t(3905)),i=["components"],l={sidebar_position:3},s="SoR Engine",c={unversionedId:"repairs-api/sor-engine",id:"repairs-api/sor-engine",title:"SoR Engine",description:"Repairs are represented by a Schedule of Rate (SoR) code.",source:"@site/docs/repairs-api/sor-engine.md",sourceDirName:"repairs-api",slug:"/repairs-api/sor-engine",permalink:"/housing-repairs-online/docs/repairs-api/sor-engine",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/repairs-api/sor-engine.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Extracting data from Cosmos DB",permalink:"/housing-repairs-online/docs/repairs-api/extracting-data"},next:{title:"Scheduling API",permalink:"/housing-repairs-online/docs/scheduling-api/intro"}},p={},d=[{value:"Configuration",id:"configuration",level:3},{value:"Example Full Configuration",id:"example-full-configuration",level:2}],u={toc:d};function N(n){var e=n.components,t=(0,a.Z)(n,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"sor-engine"},"SoR Engine"),(0,o.kt)("p",null,"Repairs are represented by a Schedule of Rate (SoR) code."),(0,o.kt)("p",null,"The nationally published register of SoR codes contains 2500+ entries."),(0,o.kt)("p",null,"Each local authority selects which specific SoR codes it wants to use from the national register.\nThey can also create new SoR codes if an existing one doesn't fit a particular repair."),(0,o.kt)("p",null,"Different local authorities can attribute different SoR codes to the same repair as represented within Housing Repairs Online service."),(0,o.kt)("p",null,"For example, a repair of a kitchen cupboard door hanging off, local authority 1 can use SoR code 123 and local authority 2 can use SoR code ABC."),(0,o.kt)("p",null,"Due to this difference, the SoR engine was created to allow each local authority to be able to use the specific SoR code they would prefer for each online reportable repair."),(0,o.kt)("p",null,"The SoR Engine offers a 3-tiered mapping of where, what and best description of the issue to a SoR code."),(0,o.kt)("p",null,"Here is an example of the values possible at the 3 tiers:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Tier question"),(0,o.kt)("th",{parentName:"tr",align:null},"Value"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"Where?"),(0,o.kt)("td",{parentName:"tr",align:null},"Kitchen")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"What?"),(0,o.kt)("td",{parentName:"tr",align:null},"Cupboard")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"Best Description?"),(0,o.kt)("td",{parentName:"tr",align:null},"Door Hanging Off")))),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Not all journey's have 3 tier's, e.g. Kitchen - Worktop"),(0,o.kt)("table",{parentName:"div"},(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Tier question"),(0,o.kt)("th",{parentName:"tr",align:null},"Value"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"Where?"),(0,o.kt)("td",{parentName:"tr",align:null},"Kitchen")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"What?"),(0,o.kt)("td",{parentName:"tr",align:null},"Worktop")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"Best Description?"),(0,o.kt)("td",{parentName:"tr",align:null},"-")))))),(0,o.kt)("h3",{id:"configuration"},"Configuration"),(0,o.kt)("p",null,"The SoR engine is configured by specifying the SoR codes in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/City-of-Lincoln-Council/housing-repairs-online-api/blob/main/HousingRepairsOnlineApi/SoRConfig.json"},"SoRConfig.json"),"."),(0,o.kt)("p",null,"Each existing SoR code must exist and have a value."),(0,o.kt)("p",null,"If an existing SoR code is removed, the mapping resolution will fail.\nIf a new SoR code is added, it will have no effect. (The frontend would need to be updated to offer the new selection options.)"),(0,o.kt)("h2",{id:"example-full-configuration"},"Example Full Configuration"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-JSON"},'{\n  "kitchen":{\n    "cupboards":{\n      "doorHangingOff":"N373049",\n      "doorMissing":"N373049"\n    },\n    "worktop": "N372005",\n    "dampOrMould": {\n      "dampOrMould" : "N114001"\n    },\n    "electrical":{\n      "extractorFan":"N840031",\n      "sockets":"N861519",\n      "lightFitting":"N861005",\n      "cookerSwitch": "N835005"\n    },\n    "sink":{\n      "taps":"N631321",\n      "pipeworkLeak":"N630147",\n      "leakBlockage": "N620507",\n      "damageSink": "N630714"\n    },\n    "wallsFloorsCeiling":{\n      "wallTiles":"N431041",\n      "floorTiles":"N432005",\n      "lightFitting":"N858111",\n      "skirtingBoardArchitrave":"N381001",\n      "plasteringCeiling":"N413105",\n      "plasteringWalls":"N411121",\n      "woodenFloorboards": "N301125"\n    },\n    "door":{\n      "backDoorWooden":"N324123",\n      "backDoorUPVC":"N325117",\n      "backFrenchDoors":"N325117",\n      "internal":"N330007",\n      "sliding":"N330007"\n    },\n    "windows": {\n      "smashed": "N551055",\n      "stuckOpen": "N315001",\n      "stuckShut": "N318125",\n      "condensation": "N318151"\n    }\n  },\n  "bathroom":{\n    "bath":{\n      "bathTaps":"N631321",\n      "sealAroundBath":"N630945",\n      "bathPanel":"N630945",\n      "bathBlockage":"N630945"\n    },\n    "showerIncludingTrayAndDoor":{\n      "electricShowerUnit":"N631131",\n      "showerTap":"N631337",\n      "showerHose":"N631111",\n      "showerHead":"N631121",\n      "showerTrayBroken":"N631103",\n      "cubicleDoorBroken":"N965003",\n      "showerDrainBlocked":"N620515"\n    },\n    "sink":{\n      "taps":"N631321",\n      "damagedSink":"N630703",\n      "leakBlockage":"N620507",\n      "pipeworkLeak":"N630147"\n    },\n    "toilet":{\n      "notFlushing":"N630573",\n      "overflowing":"N630573",\n      "looseFromFloorOrWall":"N630516",\n      "cracked": "N630509"\n    },\n    "wallsFloorsCeiling":{\n      "wallTiles":"N431041",\n      "floorTiles":"N432005",\n      "lightFitting":"N858111",\n      "skirtingBoardArchitrave":"N381001",\n      "plasteringCeiling":"N413105",\n      "plasteringWalls":"N411121",\n      "woodenFloorboards": "N301125"\n    },\n    "dampOrMould": {\n      "dampOrMould" : "N114001"\n    },\n    "electricsExtractorCords": {\n      "spotLights": "N856615",\n      "tubeLights": "N856615",\n      "pullCord": "N862004",\n      "extractorFan": "N841007"\n    },\n    "windows": {\n      "smashed": "N551055",\n      "stuckOpen": "N315001",\n      "stuckShut": "N318125",\n      "condensation": "N318151"\n    },\n    "damagedOrStuckDoors": {\n      "internalDoorIssue": "N330007",\n      "lockOnDoor": "N391707"\n    }\n  },\n  "bedroom": {\n    "wallsFloorsCeiling":{\n      "wallTiles":"N431041",\n      "floorTiles":"N432005",\n      "lightFitting":"N858111",\n      "skirtingBoardArchitrave":"N381001",\n      "plasteringCeiling":"N413105",\n      "plasteringWalls":"N411121",\n      "woodenFloorboards": "N301125"\n    },\n    "electricsLightsSwitches": {\n      "lights":"N858111",\n      "sockets": "N861511"\n    },\n    "dampOrMould": {\n      "dampOrMould" : "N114001"\n    },\n    "windows": {\n      "smashed": "N551055",\n      "stuckOpen": "N315001",\n      "stuckShut": "N318125",\n      "condensation": "N318151"\n    },\n    "damagedOrStuckDoors": {\n      "internalDoorIssue": "N330007"\n    }\n  },\n  "livingAreas": {\n    "wallsFloorsCeiling":{\n      "wallTiles":"N431041",\n      "floorTiles":"N432005",\n      "lightFitting":"N858111",\n      "skirtingBoardArchitrave":"N381001",\n      "plasteringCeiling":"N413105",\n      "plasteringWalls":"N411121",\n      "woodenFloorboards": "N301125"\n    },\n    "electricsLightsSwitches": {\n      "lights":"N858111",\n      "sockets": "N861511"\n    },\n    "dampOrMould": {\n      "dampOrMould" : "N114001"\n    },\n    "windows": {\n      "smashed": "N551055",\n      "stuckOpen": "N315001",\n      "stuckShut": "N318125",\n      "condensation": "N318151"\n    },\n    "damagedOrStuckDoors": {\n      "internalDoorIssue": "N330007"\n    },\n    "stairs": {\n      "damagedSteps": "N351003",\n      "damagedPalistrades": "N351009",\n      "handRail": "N352009",\n      "stairRailLoose": "N351019"\n    }\n  },\n  "outside": {\n    "securityLights": "N880112",\n    "door": {\n      "shedDoor": "N328101",\n      "outhouseCupboardDoor": "N330001",\n      "woodenBackDoor": "N321305",\n      "upvcBackDoor": "N325117",\n      "frenchDoors": "N325117"\n    },\n    "roof": {\n      "shedOuthouseRoof": "N223011",\n      "loftInsulation": "N227005",\n      "looseTiles": "N201113",\n      "flatRoofProblems": "N217032"\n    },\n    "garage": {\n      "doorDamage": "N345203",\n      "lockDamage": "N345609",\n      "brokenInto": "N345611",\n      "roofIssueOrLeak": "N217032"\n    },\n    "gatesAndPathways": {\n      "frontGate": "N021001",\n      "backGate": "N021001",\n      "driveway": "N021005",\n      "concretePath": "N003007",\n      "steps": "N985501"\n    }\n  }\n}\n')))}N.isMDXComponent=!0}}]);