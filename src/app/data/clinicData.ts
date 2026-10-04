export interface ClinicConfig {
  name: string;
  marathiName?: string;
  shortName: string;
  tagline: string;
  watermark: string;
  monogram: string;
  instagramHandle: string;
  logoPath?: string;

  doctor: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    degrees: string;
    badge1: string;
    badge2: string;
    specialty: string;
    quote: string;
  };

  reputation: {
    rating: number;
    reviewCount: string;
    badgeText: string;
    subCaption: string;
  };

  contact: {
    phoneDisplay: string;
    phoneTel: string;
    phoneRaw: string;
    waLink: string;
    email: string;
    addressHeadline: string;
    addressFull: string;
    plusCode: string;
    googleMapsUrl: string;
    hoursWeekdays: string;
    hoursSunday: string;
  };

  bookingPrefix: string;
}

export { activeClinicData as clinicData } from "./clients/active";
