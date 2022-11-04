const urls = {
  development: "https://sandbox.ezin.vn/api",
  test: "https://sandbox.ezin.vn/api",
  staging: "https://api-preprod.ezin.vn/api",
  production: "https://api.ezin.vn/api",
};
const tmpcodes = {
  development: "EZINVN01",
  test: "EZINVN01",
  staging: "EZINVN01",
  production: "EZINWEB1",
};
const tmpcodesToken = {
  development: "EZINWT01",
  test: "EZINWT01",
  staging: "EZINWEB2",
  production: "EZINWEB2",
};
export const baseURL = urls[process.env.NEXT_PUBLIC_APP_ENV || "development"];
export const secretOrKey = "EZINWEB@123";
export const vnpayTmncode =
  tmpcodes[process.env.NEXT_PUBLIC_APP_ENV || "development"];
export const vnpayTmncodeToken =
  tmpcodesToken[process.env.NEXT_PUBLIC_APP_ENV || "development"];
export const slogan = "Đi Bình An, Về Hạnh phúc";
export const CANONICAL_DOMAIN = "https://ezin.vn";
export const schemaCodeHome = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Ezin Smart Insurance",
    "image": "https://api.ezin.vn/public/files/62770C51DE39CEA_nguyen-xuan-tai.png",
    "@id": "https://ezin.vn/gioi-thieu",
    "url": "https://ezin.vn/",
    "telephone": "02899966333",
    "priceRange": "60000-1375000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3/40 Thích Quảng Đức, Phường 3, Phú Nhuận, Thành phố Hồ Chí Minh, Vietnam",
      "addressLocality": "Ho Chi Minh",
      "postalCode": "72213",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.803932,
      "longitude": 106.6814523
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:30",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/baohiemezin",
      "https://www.youtube.com/channel/UCAISrxMuHxjkTl3LqX1S2cQ",
      "https://www.linkedin.com/company/ezin",
      "https://ezin.vn"
    ],
    "department": {
      "@type": "InsuranceAgency",
      "name": "Ezin Lê Duẩn",
      "image": "https://api.ezin.vn/public/files/09943D0D1A1CA0B_doi-tac-bao-hiem.png",
      "telephone": "0909088313" 
    }
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Nguyễn Xuân Tài",
    "url": "https://www.linkedin.com/in/tai-nguyen-vietnam/",
    "image": "https://api.ezin.vn/public/files/62770C51DE39CEA_nguyen-xuan-tai.png",
    "sameAs": [
      "https://www.linkedin.com/company/ezin",
      "https://ezin.vn"
    ],
    "jobTitle": "CEO & President",
    "worksFor": {
      "@type": "Organization",
      "name": "Ezin Smart Insurance"
    }  
  }
  </script>
  `;
