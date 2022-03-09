---
sidebar_position: 3
---

# SoR Engine

Repairs are represented by a Schedule of Rate (SoR) code.

The nationally published register of SoR codes contains 2500+ entries.

Each local authority selects which specific SoR codes it wants to use from the national register.
They can also create new SoR codes if an existing one doesn't fit a particular repair.

Different local authorities can attribute different SoR codes to the same repair as represented within Housing Repairs Online service.

For example, a repair of a kitchen cupboard door hanging off, local authority 1 can use SoR code 123 and local authority 2 can use SoR code ABC.

Due to this difference, the SoR engine was created to allow each local authority to be able to use the specific SoR code they would prefer for each online reportable repair.

The SoR Engine offers a 3-tiered mapping of where, what and best description of the issue to a SoR code.

Here is an example of the values possible at the 3 tiers:

| Tier question     | Value            |
|-------------------|------------------|
| Where?            | Kitchen          |
| What?             | Cupboard         |
| Best Description? | Door Hanging Off |

:::note
Not all journey's have 3 tier's, e.g. Kitchen - Worktop

| Tier question     | Value            |
|-------------------|------------------|
| Where?            | Kitchen          |
| What?             | Worktop          |
| Best Description? | -                |
:::

### Configuration
The SoR engine is configured by specifying the SoR codes in [SoRConfig.json](https://github.com/City-of-Lincoln-Council/housing-repairs-online-api/blob/main/HousingRepairsOnlineApi/SoRConfig.json).

Each existing SoR code must exist and have a value.

If an existing SoR code is removed, the mapping resolution will fail.
If a new SoR code is added, it will have no effect. (The frontend would need to be updated to offer the new selection options.)

## Example Full Configuration
```JSON
{
  "kitchen":{
    "cupboards":{
      "doorHangingOff":"N373049",
      "doorMissing":"N373049"
    },
    "worktop": "N372005",
    "dampOrMould": {
      "dampOrMould" : "N114001"
    },
    "electrical":{
      "extractorFan":"N840031",
      "sockets":"N861519",
      "lightFitting":"N861005",
      "cookerSwitch": "N835005"
    },
    "sink":{
      "taps":"N631321",
      "pipeworkLeak":"N630147",
      "leakBlockage": "N620507",
      "damageSink": "N630714"
    },
    "wallsFloorsCeiling":{
      "wallTiles":"N431041",
      "floorTiles":"N432005",
      "lightFitting":"N858111",
      "skirtingBoardArchitrave":"N381001",
      "plasteringCeiling":"N413105",
      "plasteringWalls":"N411121",
      "woodenFloorboards": "N301125"
    },
    "door":{
      "backDoorWooden":"N324123",
      "backDoorUPVC":"N325117",
      "backFrenchDoors":"N325117",
      "internal":"N330007",
      "sliding":"N330007"
    },
    "windows": {
      "smashed": "N551055",
      "stuckOpen": "N315001",
      "stuckShut": "N318125",
      "condensation": "N318151"
    }
  },
  "bathroom":{
    "bath":{
      "bathTaps":"N631321",
      "sealAroundBath":"N630945",
      "bathPanel":"N630945",
      "bathBlockage":"N630945"
    },
    "showerIncludingTrayAndDoor":{
      "electricShowerUnit":"N631131",
      "showerTap":"N631337",
      "showerHose":"N631111",
      "showerHead":"N631121",
      "showerTrayBroken":"N631103",
      "cubicleDoorBroken":"N965003",
      "showerDrainBlocked":"N620515"
    },
    "sink":{
      "taps":"N631321",
      "damagedSink":"N630703",
      "leakBlockage":"N620507",
      "pipeworkLeak":"N630147"
    },
    "toilet":{
      "notFlushing":"N630573",
      "overflowing":"N630573",
      "looseFromFloorOrWall":"N630516",
      "cracked": "N630509"
    },
    "wallsFloorsCeiling":{
      "wallTiles":"N431041",
      "floorTiles":"N432005",
      "lightFitting":"N858111",
      "skirtingBoardArchitrave":"N381001",
      "plasteringCeiling":"N413105",
      "plasteringWalls":"N411121",
      "woodenFloorboards": "N301125"
    },
    "dampOrMould": {
      "dampOrMould" : "N114001"
    },
    "electricsExtractorCords": {
      "spotLights": "N856615",
      "tubeLights": "N856615",
      "pullCord": "N862004",
      "extractorFan": "N841007"
    },
    "windows": {
      "smashed": "N551055",
      "stuckOpen": "N315001",
      "stuckShut": "N318125",
      "condensation": "N318151"
    },
    "damagedOrStuckDoors": {
      "internalDoorIssue": "N330007",
      "lockOnDoor": "N391707"
    }
  },
  "bedroom": {
    "wallsFloorsCeiling":{
      "wallTiles":"N431041",
      "floorTiles":"N432005",
      "lightFitting":"N858111",
      "skirtingBoardArchitrave":"N381001",
      "plasteringCeiling":"N413105",
      "plasteringWalls":"N411121",
      "woodenFloorboards": "N301125"
    },
    "electricsLightsSwitches": {
      "lights":"N858111",
      "sockets": "N861511"
    },
    "dampOrMould": {
      "dampOrMould" : "N114001"
    },
    "windows": {
      "smashed": "N551055",
      "stuckOpen": "N315001",
      "stuckShut": "N318125",
      "condensation": "N318151"
    },
    "damagedOrStuckDoors": {
      "internalDoorIssue": "N330007"
    }
  },
  "livingAreas": {
    "wallsFloorsCeiling":{
      "wallTiles":"N431041",
      "floorTiles":"N432005",
      "lightFitting":"N858111",
      "skirtingBoardArchitrave":"N381001",
      "plasteringCeiling":"N413105",
      "plasteringWalls":"N411121",
      "woodenFloorboards": "N301125"
    },
    "electricsLightsSwitches": {
      "lights":"N858111",
      "sockets": "N861511"
    },
    "dampOrMould": {
      "dampOrMould" : "N114001"
    },
    "windows": {
      "smashed": "N551055",
      "stuckOpen": "N315001",
      "stuckShut": "N318125",
      "condensation": "N318151"
    },
    "damagedOrStuckDoors": {
      "internalDoorIssue": "N330007"
    },
    "stairs": {
      "damagedSteps": "N351003",
      "damagedPalistrades": "N351009",
      "handRail": "N352009",
      "stairRailLoose": "N351019"
    }
  },
  "outside": {
    "securityLights": "N880112",
    "door": {
      "shedDoor": "N328101",
      "outhouseCupboardDoor": "N330001",
      "woodenBackDoor": "N321305",
      "upvcBackDoor": "N325117",
      "frenchDoors": "N325117"
    },
    "roof": {
      "shedOuthouseRoof": "N223011",
      "loftInsulation": "N227005",
      "looseTiles": "N201113",
      "flatRoofProblems": "N217032"
    },
    "garage": {
      "doorDamage": "N345203",
      "lockDamage": "N345609",
      "brokenInto": "N345611",
      "roofIssueOrLeak": "N217032"
    },
    "gatesAndPathways": {
      "frontGate": "N021001",
      "backGate": "N021001",
      "driveway": "N021005",
      "concretePath": "N003007",
      "steps": "N985501"
    }
  }
}
```