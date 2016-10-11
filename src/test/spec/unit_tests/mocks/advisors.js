var advisors = [
    {
        firstName: 'Michael',
        commonName: null,
        lastName: 'Andrews',
        partialBranchInfo: {
            city: 'London',
            provinceAbbr: 'ON'
        },
        email: 'mandrews@assante.com',
        phone: '519-438-0338',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Peter',
        commonName: 'James',
        lastName: 'Kingston',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Daniel',
        commonName: null,
        lastName: 'Johnstone',
        partialBranchInfo: {
            city: 'toronto',
            provinceAbbr: 'ON'
        },
        email: 'djohnstone@assante.com',
        phone: '416-348-9994',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Jean Pierre',
        commonName: null,
        lastName: 'Beauchamp',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: 'jpbeauchamp@assante.com',
        phone: '',
        spokenLanguage: 'Bilingual'
    },
    {
        firstName: 'Claudio',
        commonName: null,
        lastName: 'Di Sante',
        partialBranchInfo: {
            city: 'Hamilton',
            provinceAbbr: 'ON'
        },
        email: 'cdisante@assante.com',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Jocelyn',
        commonName: null,
        lastName: 'CÃ´tÃ©',
        partialBranchInfo: {
            city: 'Laval', provinceAbbr: 'QC',
            email: 'JCote@assante.com'
        },
        phone: '450-668-2400',
        spokenLanguage: 'French'
    },
    {
        firstName: 'GaÃ«l',
        commonName: null,
        lastName: 'LalibertÃ©',
        partialBranchInfo: {
            city: 'Quebec',
            provinceAbbr: 'QC'
        },
        email: 'GLaliberte@assante.com',
        phone: '418-559-4484',
        spokenLanguage: 'French'
    },
    {
        firstName: 'Ashley',
        commonName: null,
        lastName: "D'Souza",
        partialBranchInfo: {
            city: 'Mississauga',
            provinceAbbr: 'ON',
        },
        email: 'adsouza@assante.com',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Michel',
        commonName: null,
        lastName: 'St.-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage:'Bilingual'
    },
    {
        firstName: 'Barbara',
        commonName: 'Barb',
        lastName: 'Stranak-St-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC',
        },
        email: 'bstranakstgeorges@assante.com',
        phone: '',
        spokenLanguage:'Bilingual'
    },
    {
        firstName: 'Thomas',
        commonName: 'Eric',
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'North Bay',
            provinceAbbr: 'ON'
        },
        email: 'ethomson@assante.com',
        phone: '',
        spokenLanguage:'English'
    },
    {
        firstName: 'Troy',
        commonName: null,
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'Brandon',
            provinceAbbr: 'MB'
        },
        email: 'troy.thomson@assante.com',
        phone: '204-7252300  ext. 32',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Alexander',
        commonName: 'Alex',
        lastName: 'Argento',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Robert',
        commonName: 'Jay',
        lastName: 'Rayner',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: 'jrayner@assante.com',
        phone: '613-766-7220',
        spokenLanguage: 'English'
    },
    {
        firstName: 'James Richard',
        commonName: 'Richard',
        lastName: 'Johnson',
        partialBranchInfo: {
            city: 'Antigonish',
            provinceAbbr: 'NS'
        },
        email: 'RJohnson@assante.com',
        phone: '',
        spokenLanguage: 'English'
    }
];
var initializedAdvisors = [
    {
        firstName: 'Michael',
        commonName: null,
        lastName: 'Andrews',
        partialBranchInfo: {
            city: 'London',
            provinceAbbr: 'ON'
        },
        email: 'mandrews@assante.com',
        phone: '519-438-0338',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['andrews'],
        fNameArr:['michael']
    },
    {
        firstName: 'Peter',
        commonName: 'James',
        lastName: 'Kingston',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: ['james'],
        lNameArr:['kingston'],
        fNameArr:['peter']
    },
    {
        firstName: 'Daniel',
        commonName: null,
        lastName: 'Johnstone',
        partialBranchInfo: {
            city: 'toronto',
            provinceAbbr: 'ON'
        },
        email: 'djohnstone@assante.com',
        phone: '416-348-9994',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['johnstone'],
        fNameArr:['daniel']
    },
    {
        firstName: 'Jean Pierre',
        commonName: null,
        lastName: 'Beauchamp',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: 'jpbeauchamp@assante.com',
        phone: '',
        spokenLanguage: 'Bilingual',
        cNameArr: [],
        lNameArr:['beauchamp'],
        fNameArr:[
            'jean',
            'pierre'
        ]
    },
    {
        firstName: 'Claudio',
        commonName: null,
        lastName: 'Di Sante',
        partialBranchInfo: {
            city: 'Hamilton',
            provinceAbbr: 'ON'
        },
        email: 'cdisante@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:[
            'di',
            'sante'
        ],
        fNameArr:[
            'claudio'
        ]
    },
    {
        firstName: 'Jocelyn',
        commonName: null,
        lastName: 'CÃ´tÃ©',
        partialBranchInfo: {
            city: 'Laval', provinceAbbr: 'QC',
            email: 'JCote@assante.com'
        },
        phone: '450-668-2400',
        spokenLanguage: 'French',
        cNameArr: [],
        lNameArr:['cote'],
        fNameArr:['jocelyn']
    },
    {
        firstName: 'GaÃ«l',
        commonName: null,
        lastName: 'LalibertÃ©',
        partialBranchInfo: {
            city: 'Quebec',
            provinceAbbr: 'QC'
        },
        email: 'GLaliberte@assante.com',
        phone: '418-559-4484',
        spokenLanguage: 'French',
        cNameArr: [],
        lNameArr:['laliberte'],
        fNameArr:['gael']
    },
    {
        firstName: 'Ashley',
        commonName: null,
        lastName: "D'Souza",
        partialBranchInfo: {
            city: 'Mississauga',
            provinceAbbr: 'ON',
        },
        email: 'adsouza@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['dsouza'],
        fNameArr:['ashley']
    },
    {
        firstName: 'Michel',
        commonName: null,
        lastName: 'St.-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage:'Bilingual',
        cNameArr: [],
        lNameArr:['stgeorges'],
        fNameArr:['michel']
    },
    {
        firstName: 'Barbara',
        commonName: 'Barb',
        lastName: 'Stranak-St-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC',
        },
        email: 'bstranakstgeorges@assante.com',
        phone: '',
        spokenLanguage:'Bilingual',
        cNameArr: ['barb'],
        lNameArr:['stranak-st-georges'],
        fNameArr:['barbara']
    },
    {
        firstName: 'Thomas',
        commonName: 'Eric',
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'North Bay',
            provinceAbbr: 'ON'
        },
        email: 'ethomson@assante.com',
        phone: '',
        spokenLanguage:'English',
        cNameArr: ['eric'],
        lNameArr:['thomson'],
        fNameArr:['thomas']
    },
    {
        firstName: 'Troy',
        commonName: null,
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'Brandon',
            provinceAbbr: 'MB'
        },
        email: 'troy.thomson@assante.com',
        phone: '204-7252300  ext. 32',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['thomson'],
        fNameArr:['troy']
    },
    {
        firstName: 'Alexander',
        commonName: 'Alex',
        lastName: 'Argento',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: ['alex'],
        lNameArr:['argento'],
        fNameArr:['alexander']
    },
    {
        firstName: 'Robert',
        commonName: 'Jay',
        lastName: 'Rayner',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: 'jrayner@assante.com',
        phone: '613-766-7220',
        spokenLanguage: 'English',
        cNameArr: ['jay'],
        lNameArr:['rayner'],
        fNameArr:['robert']
    },
    {
        firstName: 'James Richard',
        commonName: 'Richard',
        lastName: 'Johnson',
        partialBranchInfo: {
            city: 'Antigonish',
            provinceAbbr: 'NS'
        },
        email: 'RJohnson@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: ['richard'],
        lNameArr:['johnson'],
        fNameArr:[
            'james',
            'richard'
        ]
    }
];
function newAdvisor(fName, lName, cName, city, prov, email, phone, spokenLanguage){
    return {firstName: fName, commonName: cName, lastName: lName, city: city, provinceAbbr: prov, email:email, phone: phone, spokenLanguage: spokenLanguage};
};

