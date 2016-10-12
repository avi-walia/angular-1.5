var possibleProvinceFilterValues = [
    'Province',
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NS',
    'NT',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT'
];
var provinceFilter = {
    possibleValues: possibleProvinceFilterValues,
    inputDefault: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: true
        }
    ],

    inputAB: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputBC: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputMB: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputNB: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputNL: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputNS: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputNS: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputNT: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputPE: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputQC: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputSK: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: false
        }
    ],
    inputYT: [
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: possibleProvinceFilterValues[13]
            },
            expected: true
        }
    ]
}