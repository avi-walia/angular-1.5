function newAdvisor(fName, lName, cName, city, prov, email, phone, spokenLanguage){
    return {firstName: fName, commonName: cName, lastName: lName, city: city, provinceAbbr: prov, email:email, phone: phone, spokenLanguage: spokenLanguage};
};

var advisors = [
    {firstName: 'Michael', commonName: null, lastName: 'Andrews', city: 'London', provinceAbbr: 'ON', email: 'mandrews@assante.com', phone: '519-438-0338', spokenLanguage: 'English'},
    {firstName: 'Peter', commonName: 'James', lastName: 'Kingston', city: 'Kingston', provinceAbbr: 'ON', email: '', phone: '', spokenLanguage: 'English'},
    {firstName: 'Daniel', commonName: null, lastName: 'Johnstone', city: 'toronto', provinceAbbr: 'ON', email: 'djohnstone@assante.com', phone: '416-348-9994', spokenLanguage: 'English'},
    {firstName: 'Jean Pierre', commonName: null, lastName: 'Beauchamp', city: 'Dorval', provinceAbbr: 'QC', email: 'jpbeauchamp@assante.com', phone: '', spokenLanguage: 'Bilingual'},
    {firstName: 'Claudio', commonName: null, lastName: 'Di Sante', city: 'Hamilton', provinceAbbr: 'ON', email: 'cdisante@assante.com', phone: '', spokenLanguage: 'English'},
    {firstName: 'Jocelyn', commonName: null, lastName: 'CÃ´tÃ©', city: 'Laval', provinceAbbr: 'QC', email: 'JCote@assante.com', phone: '450-668-2400', spokenLanguage: 'French'},
    {firstName: 'GaÃ«l', commonName: null, lastName: 'LalibertÃ©', city: 'Quebec', provinceAbbr: 'QC', email: 'GLaliberte@assante.com', phone: '418-559-4484', spokenLanguage: 'French'},
    {firstName: 'Ashley', commonName: null, lastName: "D'Souza", city: '', provinceAbbr: '', email: 'adsouza@assante.com', phone: '', spokenLanguage: 'English'},
    {firstName: 'Michel', commonName: null, lastName: 'St.-Georges', city: 'St. Laurent', provinceAbbr: 'QC', email: '', phone: '', spokenLanguage:'Bilingual'},
    {firstName: 'Barbara', commonName: 'Barb', lastName: 'Stranak-St-Georges', city: 'St. Laurent', provinceAbbr: 'QC', email: 'bstranakstgeorges@assante.com', phone: '', spokenLanguage:'Bilingual'},
    {firstName: 'Thomas', commonName: 'Eric', lastName: 'Thomson', city: 'North Bay', provinceAbbr: 'ON', email: 'ethomson@assante.com', phone: '', spokenLanguage:'English'},
    {firstName: 'Troy', commonName: null, lastName: 'Thomson', city: 'Brandon', provinceAbbr: 'MB', email: 'troy.thomson@assante.com', phone: '204-7252300  ext. 32', spokenLanguage: 'English'},
    {firstName: 'Alexander', commonName: 'Alex', lastName: 'Argento', city: 'Dorval', provinceAbbr: 'QC', email: '', phone: '', spokenLanguage: 'English'},
    {firstName: 'Robert', commonName: 'Jay', lastName: 'Rayner', city: 'Kingston', provinceAbbr: 'ON', email: 'jrayner@assante.com', phone: '613-766-7220', spokenLanguage: 'English'},
    {firstName: 'James Richard', commonName: 'Richard', lastName: 'Johnson', city: 'Antigonish', provinceAbbr: 'NS', email: 'RJohnson@assante.com', phone: '', spokenLanguage: 'English'}
];
