const INDIA_CITIES = {
  "Andhra Pradesh": [
    { city: "Visakhapatnam", pin: "530001" }, { city: "Vijayawada", pin: "520001" }, { city: "Guntur", pin: "522001" },
    { city: "Nellore", pin: "524001" }, { city: "Tirupati", pin: "517501" }, { city: "Rajahmundry", pin: "533101" },
    { city: "Kakinada", pin: "533001" }, { city: "Anantapur", pin: "515001" }, { city: "Kurnool", pin: "518001" },
  ],
  "Arunachal Pradesh": [
    { city: "Itanagar", pin: "791111" }, { city: "Tawang", pin: "790104" }, { city: "Pasighat", pin: "791102" },
  ],
  "Assam": [
    { city: "Guwahati", pin: "781001" }, { city: "Silchar", pin: "788001" }, { city: "Dibrugarh", pin: "786001" },
    { city: "Jorhat", pin: "785001" }, { city: "Tezpur", pin: "784001" },
  ],
  "Bihar": [
    { city: "Patna", pin: "800001" }, { city: "Gaya", pin: "823001" }, { city: "Muzaffarpur", pin: "842001" },
    { city: "Bhagalpur", pin: "812001" }, { city: "Darbhanga", pin: "846004" }, { city: "Purnia", pin: "854301" },
  ],
  "Chhattisgarh": [
    { city: "Raipur", pin: "492001" }, { city: "Bilaspur", pin: "495001" }, { city: "Durg", pin: "491001" },
    { city: "Bhilai", pin: "490001" }, { city: "Korba", pin: "495677" },
  ],
  "Goa": [
    { city: "Panaji", pin: "403001" }, { city: "Margao", pin: "403601" }, { city: "Vasco da Gama", pin: "403802" },
    { city: "Mapusa", pin: "403507" },
  ],
  "Gujarat": [
    { city: "Ahmedabad", pin: "380001" }, { city: "Surat", pin: "395001" }, { city: "Vadodara", pin: "390001" },
    { city: "Rajkot", pin: "360001" }, { city: "Gandhinagar", pin: "382010" }, { city: "Bhavnagar", pin: "364001" },
    { city: "Jamnagar", pin: "361001" }, { city: "Junagadh", pin: "362001" },
  ],
  "Haryana": [
    { city: "Gurugram", pin: "122001" }, { city: "Faridabad", pin: "121001" }, { city: "Panipat", pin: "132103" },
    { city: "Ambala", pin: "134003" }, { city: "Karnal", pin: "132001" }, { city: "Hisar", pin: "125001" },
    { city: "Rohtak", pin: "124001" }, { city: "Sonipat", pin: "131001" },
  ],
  "Himachal Pradesh": [
    { city: "Shimla", pin: "171001" }, { city: "Manali", pin: "175131" }, { city: "Dharamshala", pin: "176215" },
    { city: "Kullu", pin: "175101" }, { city: "Mandi", pin: "175001" }, { city: "Solan", pin: "173212" },
  ],
  "Jharkhand": [
    { city: "Ranchi", pin: "834001" }, { city: "Jamshedpur", pin: "831001" }, { city: "Dhanbad", pin: "826001" },
    { city: "Bokaro", pin: "827001" }, { city: "Deoghar", pin: "814112" },
  ],
  "Karnataka": [
    { city: "Bengaluru", pin: "560001" }, { city: "Mysuru", pin: "570001" }, { city: "Mangaluru", pin: "575001" },
    { city: "Hubli", pin: "580020" }, { city: "Belgaum", pin: "590001" }, { city: "Udupi", pin: "576101" },
  ],
  "Kerala": [
    { city: "Thiruvananthapuram", pin: "695001" }, { city: "Kochi", pin: "682001" }, { city: "Kozhikode", pin: "673001" },
    { city: "Thrissur", pin: "680001" }, { city: "Kollam", pin: "691001" }, { city: "Alappuzha", pin: "688001" },
    { city: "Kannur", pin: "670001" }, { city: "Munnar", pin: "685612" },
  ],
  "Madhya Pradesh": [
    { city: "Bhopal", pin: "462001" }, { city: "Indore", pin: "452001" }, { city: "Jabalpur", pin: "482001" },
    { city: "Gwalior", pin: "474001" }, { city: "Ujjain", pin: "456001" },
  ],
  "Maharashtra": [
    { city: "Mumbai", pin: "400001" }, { city: "Pune", pin: "411001" }, { city: "Nagpur", pin: "440001" },
    { city: "Nashik", pin: "422001" }, { city: "Aurangabad", pin: "431001" }, { city: "Thane", pin: "400601" },
    { city: "Navi Mumbai", pin: "400703" }, { city: "Kolhapur", pin: "416001" },
  ],
  "Manipur": [
    { city: "Imphal", pin: "795001" }, { city: "Thoubal", pin: "795138" },
  ],
  "Meghalaya": [
    { city: "Shillong", pin: "793001" }, { city: "Tura", pin: "794001" },
  ],
  "Mizoram": [
    { city: "Aizawl", pin: "796001" }, { city: "Lunglei", pin: "796701" },
  ],
  "Nagaland": [
    { city: "Kohima", pin: "797001" }, { city: "Dimapur", pin: "797112" },
  ],
  "Odisha": [
    { city: "Bhubaneswar", pin: "751001" }, { city: "Cuttack", pin: "753001" }, { city: "Puri", pin: "752001" },
    { city: "Rourkela", pin: "769001" }, { city: "Berhampur", pin: "760001" },
  ],
  "Punjab": [
    { city: "Chandigarh", pin: "160001" }, { city: "Ludhiana", pin: "141001" }, { city: "Amritsar", pin: "143001" },
    { city: "Jalandhar", pin: "144001" }, { city: "Patiala", pin: "147001" }, { city: "Bathinda", pin: "151001" },
  ],
  "Rajasthan": [
    { city: "Jaipur", pin: "302001" }, { city: "Jodhpur", pin: "342001" }, { city: "Udaipur", pin: "313001" },
    { city: "Kota", pin: "324001" }, { city: "Ajmer", pin: "305001" }, { city: "Bikaner", pin: "334001" },
    { city: "Jaisalmer", pin: "345001" },
  ],
  "Sikkim": [
    { city: "Gangtok", pin: "737101" }, { city: "Namchi", pin: "737126" },
  ],
  "Tamil Nadu": [
    { city: "Chennai", pin: "600001" }, { city: "Coimbatore", pin: "641001" }, { city: "Madurai", pin: "625001" },
    { city: "Tiruchirappalli", pin: "620001" }, { city: "Salem", pin: "636001" }, { city: "Tirunelveli", pin: "627001" },
    { city: "Ooty", pin: "643001" }, { city: "Pondicherry", pin: "605001" },
  ],
  "Telangana": [
    { city: "Hyderabad", pin: "500001" }, { city: "Warangal", pin: "506001" }, { city: "Nizamabad", pin: "503001" },
    { city: "Karimnagar", pin: "505001" }, { city: "Secunderabad", pin: "500003" },
  ],
  "Tripura": [
    { city: "Agartala", pin: "799001" },
  ],
  "Uttar Pradesh": [
    { city: "Lucknow", pin: "226001" }, { city: "Noida", pin: "201301" }, { city: "Agra", pin: "282001" },
    { city: "Varanasi", pin: "221001" }, { city: "Kanpur", pin: "208001" }, { city: "Prayagraj", pin: "211001" },
    { city: "Ghaziabad", pin: "201001" }, { city: "Meerut", pin: "250001" }, { city: "Gorakhpur", pin: "273001" },
  ],
  "Uttarakhand": [
    { city: "Dehradun", pin: "248001" }, { city: "Haridwar", pin: "249401" }, { city: "Rishikesh", pin: "249201" },
    { city: "Nainital", pin: "263001" }, { city: "Mussoorie", pin: "248179" },
  ],
  "West Bengal": [
    { city: "Kolkata", pin: "700001" }, { city: "Siliguri", pin: "734001" }, { city: "Howrah", pin: "711101" },
    { city: "Durgapur", pin: "713201" }, { city: "Asansol", pin: "713301" }, { city: "Darjeeling", pin: "734101" },
  ],
  "Delhi": [
    { city: "New Delhi", pin: "110001" }, { city: "South Delhi", pin: "110017" }, { city: "North Delhi", pin: "110006" },
    { city: "East Delhi", pin: "110051" }, { city: "West Delhi", pin: "110018" }, { city: "Dwarka", pin: "110075" },
  ],
  "Jammu and Kashmir": [
    { city: "Srinagar", pin: "190001" }, { city: "Jammu", pin: "180001" }, { city: "Anantnag", pin: "192101" },
    { city: "Gulmarg", pin: "193403" }, { city: "Pahalgam", pin: "192126" },
  ],
};

export default INDIA_CITIES;
