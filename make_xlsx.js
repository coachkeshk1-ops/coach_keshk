const XLSX = require('xlsx');

const traineesData = [
  {
    "Trainee ID": "KESH-101",
    "Name": "عمر السيد",
    "Phone": "+201001234567",
    "Email": "omar@example.com",
    "Age": 27,
    "Weight": 84,
    "Target Weight": 76,
    "Height": 180,
    "Goal": "تنشيف وبناء عضلات صافية",
    "Calories": 2350,
    "Protein": 185,
    "Carbs": 220,
    "Fats": 65,
    "Coach Notes": "أداء ممتاز يا عمر! استمر على نفس الماكروز هذا الأسبوع وواظب على 4 لتر ماء يومياً."
  },
  {
    "Trainee ID": "KESH-102",
    "Name": "سارة أحمد",
    "Phone": "+201119876543",
    "Email": "sara@example.com",
    "Age": 24,
    "Weight": 62,
    "Target Weight": 57,
    "Height": 165,
    "Goal": "شد الجسم وزيادة اللياقة",
    "Calories": 1750,
    "Protein": 130,
    "Carbs": 165,
    "Fats": 50,
    "Coach Notes": "التزام رائع يا سارة! ركزي على شرب الماء والنوم الجيد."
  },
  {
    "Trainee ID": "KESH-103",
    "Name": "محمود حسن",
    "Phone": "+201223334444",
    "Email": "mahmoud@gmail.com",
    "Age": 29,
    "Weight": 95,
    "Target Weight": 85,
    "Height": 178,
    "Goal": "خسارة دهون وتنشيف حاد",
    "Calories": 2100,
    "Protein": 175,
    "Carbs": 190,
    "Fats": 55,
    "Coach Notes": "التزم بالبرنامج الغذائي والتمارين الرياضية بانتظام."
  }
];

const worksheet = XLSX.utils.json_to_sheet(traineesData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Trainees");
XLSX.writeFile(workbook, "trainees.xlsx");
console.log("Successfully generated trainees.xlsx Excel file!");
