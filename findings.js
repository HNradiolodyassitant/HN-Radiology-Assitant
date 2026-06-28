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

    sideText: function(side) {
      return side === "دوطرفه" ? "هر دو کلیه" : "کلیه " + side;
    },

    generateFindingText: function(data) {
      let kidneyText = this.sideText(data.side);

      let hydroText = "";

      if (data.hydronephrosis !== "ندارد") {
        hydroText = " که با هیدرونفروز " + data.hydronephrosis + " همراه است. قطر AP لگنچه " + kidneyText + " " + data.apPelvisDiameter + " میلی‌متر اندازه‌گیری شد.";
      } else {
        hydroText = ". شواهدی از هیدرونفروز مشاهده نشد.";
      }

      if (data.mode === "single") {
        return "سنگ به قطر " + data.singleSize + " میلی‌متر در " + data.singleLocation + " " + kidneyText + " رویت شد" + hydroText;
      }

      if (data.mode === "multiple") {
        let parts = [];

        if (data.upperSize) parts.push("در کالیس فوقانی تا قطر " + data.upperSize + " میلی‌متر");
        if (data.midSize) parts.push("در کالیس میانی تا قطر " + data.midSize + " میلی‌متر");
        if (data.lowerSize) parts.push("در کالیس تحتانی تا قطر " + data.lowerSize + " میلی‌متر");
        if (data.pelvisSize) parts.push("در لگنچه تا قطر " + data.pelvisSize + " میلی‌متر");

        return "تصویر حداقل " + data.count + " سنگ در " + kidneyText + " رویت شد که بزرگ‌ترین آن‌ها " + parts.join("، ") + " قرار دارند" + hydroText;
      }

      if (data.mode === "staghorn") {
        let locations = data.staghornLocations.join("، ");
        let pelvisText = data.staghornLocations.includes("لگنچه") ? " با گسترش به لگنچه" : "";

        return "سنگ‌های متعدد با نمای شاخ‌گوزنی در " + locations + " " + kidneyText + pelvisText + "، با قطر تجمعی " + data.totalSize + " میلی‌متر رویت شد" + hydroText;
      }
    },

    generateImpression: function(data) {
      let kidneyText = this.sideText(data.side);

      if (data.mode === "single") {
        let text = "سنگ " + data.singleSize + " میلی‌متری در " + data.singleLocation + " " + kidneyText;
        if (data.hydronephrosis !== "ندارد") text += " همراه با هیدرونفروز " + data.hydronephrosis;
        return text;
      }

      if (data.mode === "multiple") {
        let text = "سنگ‌های متعدد در " + kidneyText;
        if (data.hydronephrosis !== "ندارد") text += " همراه با هیدرونفروز " + data.hydronephrosis;
        return text;
      }

      if (data.mode === "staghorn") {
        let text = "سنگ‌های متعدد با نمای شاخ‌گوزنی در " + kidneyText + " با قطر تجمعی " + data.totalSize + " میلی‌متر";
        if (data.hydronephrosis !== "ندارد") text += " همراه با هیدرونفروز " + data.hydronephrosis;
        return text;
      }
    }
  },

  prostateEngine: {
    id: "HN-US-003",
    title: "ارزیابی پروستات",
    category: "Prostate",

    calculateVolume: function(ml, ap, cc) {
      let volume = (Number(ml) * Number(ap) * Number(cc) * 0.52) / 1000;
      return Math.round(volume);
    },

    generateFindingText: function(data) {
      let texts = [];

      if (data.mode === "normal") {
        return "پروستات از نظر ابعاد و اکوپترن طبیعی است.";
      }

      let volumeText = "";
      if (data.includeVolume === "بله") {
        let volume = this.calculateVolume(data.ml, data.ap, data.cc);
        volumeText = " با حجم تقریبی " + volume + " سی‌سی";
      }

      if (data.mode === "enlargement") {
        let text = "پروستات" + volumeText + " بزرگ‌تر از حد طبیعی بوده، حدود آن صاف و منظم است";

        if (data.transitionZone === "بزرگ شده") {
          text += " و بزرگ‌شدگی Transition zone مشاهده می‌شود";
        }

        text += ".";

        texts.push(text);
      }

      if (data.medianLobe === "دارد") {
        texts.push("برجستگی Median lobe به میزان " + data.medianLobeSize + " میلی‌متر به داخل مثانه مشاهده شد.");
      }

      if (data.calcification === "دارد") {
        texts.push("کلسیفیکاسیون " + data.calcificationType + " در " + data.calcificationLocation + " پروستات رویت شد.");
      }

      if (data.prostatitisPattern === "حاد") {
        texts.push("هتروژنی اکوتکچر پروستات در صورت تطابق بالینی می‌تواند مطرح‌کننده پروستاتیت باشد.");
      }

      if (data.prostatitisPattern === "مزمن") {
        texts.push("کلسیفیکاسیون‌های coarse متعدد پروستات در صورت تطابق بالینی می‌تواند در زمینه پروستاتیت مزمن باشد.");
      }

      return texts.join(" ");
    },

    generateImpression: function(data) {
      let impressions = [];

      if (data.mode === "enlargement") {
        let volume = this.calculateVolume(data.ml, data.ap, data.cc);
        let text = "بزرگی خوش‌خیم‌نمای پروستات";

        if (data.includeVolume === "بله") {
          text += " با حجم تقریبی " + volume + " سی‌سی";
        }

        if (data.transitionZone === "بزرگ شده") {
          text += " و بزرگ‌شدگی Transition zone";
        }

        text += " که در صورت تطابق بالینی می‌تواند در زمینه بزرگی خوش‌خیم پروستات باشد";

        impressions.push(text);
      }

      if (data.medianLobe === "دارد") {
        impressions.push("برجستگی Median lobe به داخل مثانه");
      }

      if (data.prostatitisPattern === "حاد") {
        impressions.push("در صورت تطابق بالینی، یافته‌ها می‌تواند مطرح‌کننده پروستاتیت باشد");
      }

      if (data.prostatitisPattern === "مزمن") {
        impressions.push("کلسیفیکاسیون‌های coarse متعدد پروستات که در صورت تطابق بالینی می‌تواند در زمینه پروستاتیت مزمن باشد");
      }

      return impressions.join(". ");
    }
  }
};
