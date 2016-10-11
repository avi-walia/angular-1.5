var provinceFilter = {
    possibleValues: [
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
    ],
    inputDefault: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: true
        }
    ],

    inputAB: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputBC: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputMB: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputNB: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputNL: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputNS: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputNS: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputNT: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputPE: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputQC: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputSK: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: true
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: false
        }
    ],
    inputYT: [
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[1]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[2]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[3]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[4]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[5]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[6]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[7]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[8]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[9]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[10]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[11]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[12]
            },
            expected: false
        },
        {
            partialBranchInfo: {
                provinceAbbr: this.possibleValues[13]
            },
            expected: true
        }
    ]
}