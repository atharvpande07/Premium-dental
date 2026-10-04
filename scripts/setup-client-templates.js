const fs = require('fs');
const path = require('path');

const clientsDir = path.join(__dirname, '..', 'src', 'app', 'data', 'clients');
if (!fs.existsSync(clientsDir)) {
  fs.mkdirSync(clientsDir, { recursive: true });
}

for (let i = 2; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  const filePath = path.join(clientsDir, `client-${num}.ts`);
  if (!fs.existsSync(filePath)) {
    const content = `import { ClinicConfig } from "../clinicData";

export const client${num}Data: ClinicConfig = {
  name: "Apex Dental Studio ${num}",
  marathiName: "डेंटल क्लिनिक ${num}",
  shortName: "Apex Dental ${num}",
  tagline: "Precision Dentistry | Root Canal Specialist | Dental Implant | Smile Makeover",
  watermark: "APEX DENTAL",
  monogram: "AD",
  instagramHandle: "@APEX.DENTAL${num}",

  doctor: {
    name: "Dr. Clinic Specialist",
    firstName: "Dr.",
    lastName: "Specialist",
    title: "Root Canal Specialist & Implantologist",
    degrees: "BDS, MDS",
    badge1: "Root Canal Specialist",
    badge2: "Chief Dental Surgeon",
    specialty: "Advanced Endodontics, Dental Implants & Smile Design",
    quote:
      "We combine modern technology with gentle, patient-focused care — ensuring your treatment is completely pain-free and lasting.",
  },

  reputation: {
    rating: 4.9,
    reviewCount: "120+",
    badgeText: "4.9 ★ Rating (120+ Reviews)",
    subCaption:
      "Authentic experiences from patients who found gentle care, clarity, and renewed smile confidence.",
  },

  contact: {
    phoneDisplay: "+91 98765 43210",
    phoneTel: "+919876543210",
    phoneRaw: "919876543210",
    waLink: "https://wa.me/919876543210",
    email: "contact@apexdental${num}.com",
    addressHeadline: "Apex Dental Studio ${num}",
    addressFull: "Level 1, Commercial Complex, Main Avenue",
    plusCode: "PITCH-${num}",
    googleMapsUrl: "https://maps.google.com",
    hoursWeekdays: "Monday – Saturday: 10:00 AM – 8:30 PM",
    hoursSunday: "Sunday: 10:00 AM – 2:00 PM (Emergency Consultation)",
  },

  bookingPrefix: "AD${num}-",
};
`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created client template: ${filePath}`);
  }
}
