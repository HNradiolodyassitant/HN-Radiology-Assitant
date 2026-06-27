const FINDING_BANK = {
  ureterStone: {
    id: "HN-US-001",
    title: "سنگ حالب",
    category: "Urinary Tract",

    fields: {
      side: ["راست", "چپ"],
      location: [
        "UPJ",
        "یک‌سوم پروگزیمال حالب",
        "یک‌سوم میانی حالب",
        "یک‌سوم دیستال حالب",
        "UVJ"
      ],
      stoneSize: "mm",
      distanceFromUPJ: "mm",
      distanceFromUVJ: "mm",
      hydronephrosis: ["ندارد", "خفیف", "متوسط", "شدید"],
      apPelvisDiameter: "mm",
      hydroureter: ["دارد", "ندارد"],
      urinaryJet: ["دیده شد", "دیده نشد"]
    },

    reportOrder: [
      "side",
      "location",
      "stoneSize",
      "distance",
      "hydronephrosis",
      "apPelvisDiameter",
      "hydroureter",
      "urinaryJet"
    ],

    normalKidneyOverride: true,

    generateFindingText: function(data) {
      let sideText = data.side === "راست" ? "راست" : "چپ";

      let locationText = data.location;
      let distanceText = "";

      if (data.location === "یک‌سوم پروگزیمال حالب") {
        distanceText = "، در فاصله تقریبی " + data.distanceFromUPJ + " میلی‌متری از UPJ";
      }

      if (data.location === "یک‌سوم دیستال حالب") {
        distanceText = "، در فاصله تقریبی " + data.distanceFromUVJ + " میلی‌متری از UVJ";
      }

      let obstructionText = "";

      if (data.hydronephrosis !== "ندارد") {
        obstructionText = " که باعث هیدرواورترونفروز " + data.hydronephrosis + " در سمت " + sideText + " شده است. قطر AP لگنچه کلیه " + sideText + " " + data.apPelvisDiameter + " میلی‌متر اندازه‌گیری شد.";
      } else {
        obstructionText = " شواهدی از هیدرونفروز واضح در سمت " + sideText + " مشاهده نشد.";
      }

      let jetText = "";

      if (data.urinaryJet === "دیده نشد") {
        jetText = " جت ادراری از سمت " + sideText + " مشاهده نشد.";
      } else {
        jetText = " جت ادراری از سمت " + sideText + " مشاهده شد.";
      }

      return "سنگ " + data.stoneSize + " میلی‌متری در " + locationText + " سمت " + sideText + distanceText + " رویت شد" + obstructionText + jetText;
    },

    generateImpression: function(data) {
      let sideText = data.side === "راست" ? "راست" : "چپ";
      let locationText = data.location;

      let text = "سنگ " + data.stoneSize + " میلی‌متری " + locationText + " سمت " + sideText;

      if (data.hydronephrosis !== "ندارد") {
        text += " با هیدرواورترونفروز " + data.hydronephrosis + " کلیه " + sideText;
      }

      if (data.urinaryJet === "دیده نشد") {
        text += " و عدم مشاهده جت ادراری همان سمت";
      }

      return text;
    }
  }
};
