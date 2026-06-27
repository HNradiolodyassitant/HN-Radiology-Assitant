const FINDING_BANK = {
  ureterStone: {
    id: "HN-US-001",
    title: "سنگ حالب",
    category: "Urinary Tract",

    generateFindingText: function(data) {
      let sideText = data.side;
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
        obstructionText = ". شواهدی از هیدرونفروز واضح در سمت " + sideText + " مشاهده نشد.";
      }

      let jetText = data.urinaryJet === "دیده نشد"
        ? " جت ادراری از سمت " + sideText + " مشاهده نشد."
        : " جت ادراری از سمت " + sideText + " مشاهده شد.";

      return "سنگ " + data.stoneSize + " میلی‌متری در " + data.location + " سمت " + sideText + distanceText + " رویت شد" + obstructionText + jetText;
    },

    generateImpression: function(data) {
      let text = "سنگ " + data.stoneSize + " میلی‌متری " + data.location + " سمت " + data.side;

      if (data.hydronephrosis !== "ندارد") {
        text += " با هیدرواورترونفروز " + data.hydronephrosis + " کلیه " + data.side;
      }

      if (data.urinaryJet === "دیده نشد") {
        text += " و عدم مشاهده جت ادراری همان سمت";
      }

      return text;
    }
  },

  renalStone: {
    id: "HN-US-002",
    title: "سنگ کلیه",
    category: "Kidney",

    generateFindingText: function(data) {
      let hydroText = "";

      if (data.hydronephrosis !== "ندارد") {
        hydroText = " که با هیدرونفروز " + data.hydronephrosis + " همراه است. قطر AP لگنچه کلیه " + data.side + " " + data.apPelvisDiameter + " میلی‌متر اندازه‌گیری شد.";
      } else {
        hydroText = ". شواهدی از هیدرونفروز مشاهده نشد.";
      }

      if (data.mode === "single") {
        return "سنگ به قطر " + data.singleSize + " میلی‌متر در " + data.singleLocation + " کلیه " + data.side + " رویت شد" + hydroText;
      }

      if (data.mode === "multiple") {
        let parts = [];

        if (data.upperSize) parts.push("در کالیس فوقانی تا قطر " + data.upperSize + " میلی‌متر");
        if (data.midSize) parts.push("در کالیس میانی تا قطر " + data.midSize + " میلی‌متر");
        if (data.lowerSize) parts.push("در کالیس تحتانی تا قطر " + data.lowerSize + " میلی‌متر");
        if (data.pelvisSize) parts.push("در لگنچه تا قطر " + data.pelvisSize + " میلی‌متر");

        return "تصویر حداقل " + data.count + " سنگ در کلیه " + data.side + " رویت شد که بزرگ‌ترین آن‌ها " + parts.join("، ") + " قرار دارند" + hydroText;
      }

      if (data.mode === "staghorn") {
        let locations = data.staghornLocations.join("، ");
        let pelvisText = data.staghornLocations.includes("لگنچه") ? " با گسترش به لگنچه" : "";

        return "سنگ‌های متعدد با نمای شاخ‌گوزنی در " + locations + " کلیه " + data.side + pelvisText + "، با قطر تجمعی " + data.totalSize + " میلی‌متر رویت شد" + hydroText;
      }
    },

    generateImpression: function(data) {
      if (data.mode === "single") {
        let text = "سنگ " + data.singleSize + " میلی‌متری در " + data.singleLocation + " کلیه " + data.side;
        if (data.hydronephrosis !== "ندارد") text += " همراه با هیدرونفروز " + data.hydronephrosis;
        return text;
      }

      if (data.mode === "multiple") {
        let text = "سنگ‌های متعدد کلیه " + data.side;
        if (data.hydronephrosis !== "ندارد") text += " همراه با هیدرونفروز " + data.hydronephrosis;
        return text;
      }

      if (data.mode === "staghorn") {
        let text = "سنگ‌های متعدد با نمای شاخ‌گوزنی در کلیه " + data.side + " با قطر تجمعی " + data.totalSize + " میلی‌متر";
        if (data.hydronephrosis !== "ندارد") text += " همراه با هیدرونفروز " + data.hydronephrosis;
        return text;
      }
    }
  }
};
