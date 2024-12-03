patterns = {
    "numberOnly": /^[0-9]$/,
    "numberWithUnit": /^[0-9]+\s*[a-zA-Z]+$/,
    "emailOnly": "",
    "ip": ""
}
dataStructure_criteria = {
    "name": "",
    "values": [
        {
            _id: "",
            value: ""
        }
    ],
    "conditions": [],
    "units": {
        "list": [],
        "listOrder": "asc"
    },
    "search_conf": {
        "patternVsvalue": ["numbersOnly", "numberWithUnit"],
        "patternVsunit": {
            "pattern1": "unitName",
            "pattern2": "unitName"
        }
    },
    "validator": "numberOnly",
    "data_type": "String",
    "default": {
        "condition": "",
        "values": [],
        "units": []
    }
}
var selected_filts = [
    {
        condition: "",
        name: "",
        value: [
            {
                val: "",
                unit: "",
                id: ""
            }
        ]
    }
]

var search_res = [
        {
            name: "No. of Disks",
            score: 10,
            match_found_in: "value",
            match: {
              values: [
                {
                  value: "1",
                  _id: "1",
                  score: 10
                }
              ],
              unit: ""
            }
        }
]
//OUTPUT FORMAT:
// var search_res = [
//   {
//     name: "Role",
//     score: 100,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "10kasi",
//           _id: "10kasi",
//           score: 100
//         },
//         {
//           value: "alpha1",
//           _id: "alpha1",
//           score: 95
//         },
//         {
//           value: "APDEV1",
//           _id: "APDEV1",
//           score: 95
//         },
//         {
//           value: "alerts_s1",
//           _id: "alerts_s1",
//           score: 92
//         },
//         {
//           value: "apptics_dev1",
//           _id: "apptics_dev1",
//           score: 89
//         },

//         {
//           value: "assist-scale1",
//           _id: "assist-scale1",
//           score: 88
//         }
//       ],
//       unit: ""
//     }
//   },
//   {
//     name: "Event name",
//     score: 88,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "AMD_ERRATUM_1474_ISSUE",
//           _id: "AMD_ERRATUM_1474_ISSUE",
//           score: 88
//         }
//       ],
//       unit: ""
//     }
//   },
//   {
//     name: "No. of Disks",
//     score: 10,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "1",
//           _id: "1",
//           score: 10
//         }
//       ],
//       unit: ""
//     }
//   },
//   {
//     name: "Max CPU Speed",
//     score: 9,
//     match_found_in: "value",
//     match: {
//       values: [
//         {
//           value: "1",
//           _id: "1",
//           score: 10
//         }
//       ],
//       unit: ""

//     }
//   }
// ]