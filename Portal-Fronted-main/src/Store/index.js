import { writable } from "svelte/store";

export let alert = writable({
  text: "",
  isActive: false,
  status: "",
});

export let isLogin = writable(false);

export let drawerAction = writable({
  isActive: false,
  generateOtp: false,
});

export let production = false;

export let fetchURL = production
  ? "https://api.spectrum22.xyz"
  : "http://localhost:3000";

// Campaigner Details
export let user = writable({});
// Participant Student
export let student = writable({});

// export let events = writable([]);

export let registerEvent = writable({});

export let confirmRegisterDrawer = writable(false);

export let selectEventMode = writable(false);

// Combo or Single Event
export let isCombo = writable(false);

export let comboState = writable({
  event1: {
    name: "",
    member: [],
    event_fee: 0,
    max_limit: 0,
  },
  event2: {
    name: "",
    member: [],
    event_fee: 0,
    max_limit: 0,
  },
  event3: {
    name: "",
    member: [],
    event_fee: 0,
    max_limit: 0,
  },
});

export let singleState = writable({
  name: "",
  member: [],
  event_fee: 0,
  max_limit: 0,
});

// stored Local storage data for existing student
let localStudents = localStorage.getItem("existing-students"); //[]
if (!localStudents) {
  localStudents = [];
} else {
  localStudents = JSON.parse(localStorage.getItem("existing-students"));
}

export let existingStudents = writable(localStudents);

//changable data

export let comboEvents = writable({});

// export let collages = [
//   "A D Patel Institute Of Technology,New Vallabh Vidyanagar",
//   "G H Patel college of engineering & technology,bakrol rd,bakrol",
//   "birla Vishvakarma Mahavidyalaya(BVM),motabazaar,Vallabh Vidyanagar Anand",
//   "Madhuben And Bhanubhai Patel Institute Of Technology-CVM University,GIDC,Phase Iv,vithal Udyognagar,beyond ,anand",
//   "Knowlede Institute Of Thchnology And Engineering,near S.P.University Sport Complex,bakrol-Vadtal Road,bakrol,anand",
//   "Mechatronics Dept. , G H Patel College Of Engineering Bakrol Road,mota Bazar, Vallabh Vidyanagar Anand",
//   "G.C.E.T Civil Branch,mota Bazzar, Vallabh Vidyanagar Anand",
//   "Sheth M.c College Of Dariy Science,anand Agricultural University Anand",
//   "bbit Electrical Eng. Gia , Opp Iskon Temple Near, Mota Bazaar, Vallabh Vidyanagar ",
//   "EC Department Bbit,GWXF+OJC, Patel Society Mota Bazaar V V Anand",
//   "sardar Vallabhbhai Patel Institute Of Technology,svit Road,rajupura Village,vasad,anand",
//   "sardar Patel Education Campus2 ,12 Madhuvan Socirty Area,opp.sigma Prime,mahadev,v V Nagar Anand",
//   "sardar Patel College Of Eng.sardar Patel Education Campus,vadtal Rd,bakrol Anand",
//   "dr. Jivraj Mehta Institute Of Technology Mogar National Highway No 8,near Sankara Eye Hospital,mogar Anand",
//   "Charotar University Of Science And Technology(CHARUSAT) Nadiad-Petlad Rd Changa Gujarat",
//   "College Of Food Processing Technology & Bio Energy Anand Agricultural University",
//   "Shree P.M Patel College Of Electronics & Communication Nr Sardarbaug Swimming Pool Build C Floor 102 Opp.new Bus Stand Anand",
//   "Ipcowala Institute Of Engineering & Technology Dharmaj Anand",
//   "anand Institute Of Information Science Opp.town Hall Rd , Nr.grid Crossing Anand",
//   "The U And Pu Patel Department Of Computer Engineering Anand",
//   "N.S Patel Arts College Bhalej Road Anand",
//   "ISTAR DEPARTMENT OF INDUSTRIAL CHEMISTRY Mota Bazaar V V Anand",
//   "devang Patel Institute Of Advance Technology And Research,anand",
//   "S S PATEL COLLEGE Of Physical Education Anand District Near Bhaikaka Hostel V V Anand",
//   "M B Patel Science Charotar Education Society Near Sardar Hunj Anand",
//   "NV PATEL Science College  Mota Bazaar V V Anand",
//   "Semcom College Opp. Shashtri Ground Anand",
//   "Nalini Arvind & T.v Patel Arts College Nana Bazaar Anand",
//   "smt. J. B Patel College Of Commerce  Studies And Reseach Anand,building D Second Floor 203 Nr.sardar Baug Bhalej Rd Opp New Bus Stand Anand",
//   "anand Law College,srksm Campus Near Electic Grid Anand ",
//   "Cvm Private Iti For Women (sharda Ben C.l. Patel I.t.i Forwoman)",
//   "anand Arts College Nr.grid Crossing Rahtlav Mathiya Chora,anand ",
//   "Shree R N Patel Institute Of Design",
//   "C P PATEL & F H SHAH COMMERCE COLLEGE NS Arts Circle Nr Sardar Patel Overbridge. Anand",
//   "C Z Patel College Of Business & Management New V V , Gidc Anand",
//   "shantaben Manubhaipatel School Of Studies And Research In Architecture And Interior Desing (smaid),new V V ,gidc Anand",
//   "S M Patel Home Science College Anand, Bhaikaka Rd, Mota Bazaar V V Nagar Anand",
//   "pramuskhswami Medical College, Karamsad Anand",
//   "A R College Of Pharmacy And G H Patel Institute Of Pharmacy , B/h Charutar Vidyamandal Office Nr Mpta Bazaar Vvanand",
//   "Anand Commerce Collegeopp Anand Town Hall",
//   "shri I J Patel B.ed. College,s.no114/5 Elecon Company Rd New Building Mahatma Gandhi V V Campus Mogri Anand",
//   "indukaka  Ipcowala College Of Pharmacy, New V V ,gidc Anand",
//   "Anand Pharmacy College Opp Town Hall",
// ];

export let collages = [
  "A D PATEL INSTITUE OF TECHNOLOGY(ADIT)",
  "BIRLA VISHVAKARMA MAHAVIDHYALAYA (BVM)",
  "MADHUBEN AND BHANUBHAI INSTITUTE OF TECHNOLOGY(MBIT)",
  "CZ PATEL COLLEGE OF BUSINESS AND MANAGEMENT(CZ)",
  "ASHOK AND RITA PATEL INSTITUE OF  INTEGRATED STUDIES AND RESEARCH IN BIOTECHNOLOGY AND SCIENCES(ARIBAS)",
  "G. H. PATEL INSTITUE OF TECHNOLOGY(GCET)",
  "INDUKAKA IPCOWALA COLLEGE OF PHARMACY",
  "CHARUSAT",
  "G J PATEL COLLEGE OF AYURVEDA",
  "V.P & R.P.T.P SCIENCE COLLEGE",
  "SARDAR PATEL EDUCATION CAMPUS(SPEC)",
  "SEMCOM COLLEGE",
  "INSTITUE OF LANGUAGE STUDIES AND APPLIED SOCIAL SCIENCES",
  "SVIT VASAD",
  "MB PATEL SCIENCE COLLEGE",
  "ANAND AGRICULTURAL UNIVERSITY",
  "BHAILALBHAI & BHIKHABHAI INSTITUTE OF TECHNOLOGY",
  "GUJARAT STATE FERTILIZERS AND CHEMICALS",
  "BHIKHABHAI JIVABHAI VANIJYA MAHAVIDYALAYA",
  "GSFC COLLAGE, VADODRA",
  "A R COLLEGE OF PHARMACY",
  "AIMS COLLEGE MANAGEMENT AND TECHNOLOGY",
  "DHARMSINH DESAI UNIVERSITY(DDU)",
  "M.S.UNIVERSITY OF PERFORMING ARTS",
  "SIGMA GROUP OF INSTITUTES",
  "ITM",
  "SARVAJANIK COLLEGE OF ENGINEERING & TECHNOLOGY",
  "CK PITHAWALA COLLEGE OF ENGINEERING AND TECHNOLOGY",
  "ANAND COLLEGE OF LEGAL STUDIES",
  "Other",
];
