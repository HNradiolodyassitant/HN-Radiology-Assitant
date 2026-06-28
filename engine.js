let currentGender="male";
let findings={
ureterStone:false,
renalStone:false,
prostateEngine:false,
fattyLiver:false,
appendicitis:false,
bph:false,
bladderWall:false,
bladderDebris:false
};

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.style.display="none");
document.getElementById(id).style.display="block";
}

function setGender(g){
currentGender=g;
document.getElementById("maleBtn").classList.toggle("active",g==="male");
document.getElementById("femaleBtn").classList.toggle("active",g==="female");
document.getElementById("femaleFields").style.display=g==="female"?"block":"none";
if(g==="female"){removeFinding("bph");removeFinding("prostateEngine")}
}

function v(id,fallback="..."){
const el=document.getElementById(id);
return el&&el.value.trim()?el.value.trim():fallback;
}

function addFinding(){
const f=document.getElementById("findingSelect").value;
if(!f)return;
if((f==="bph"||f==="prostateEngine")&&currentGender==="female"){alert("یافته پروستات فقط برای آقا فعال است.");return;}
if(f==="prostateEngine")findings.bph=false;
if(f==="bph")findings.prostateEngine=false;
findings[f]=true;
renderFindings();
document.getElementById("findingSelect").value="";
}

function removeFinding(f){
findings[f]=false;
renderFindings();
}

function renderFindings(){
const labels={
ureterStone:"سنگ حالب",
renalStone:"سنگ کلیه",
prostateEngine:"ارزیابی پروستات",
fattyLiver:"کبد چرب گرید I",
appendicitis:"آپاندیسیت حاد",
bph:"BPH قدیمی",
bladderWall:"افزایش ضخامت جدار مثانه",
bladderDebris:"دبری اکوژن مختصر شناور در مثانه"
};

Object.keys(findings).forEach(f=>{
const card=document.getElementById(f+"Card");
if(card)card.classList.toggle("hidden",!findings[f]);
});

let html="";
Object.keys(findings).forEach(f=>{
if(findings[f])html+="<div class='badge'>"+labels[f]+"</div> ";
});
document.getElementById("findingList").innerHTML=html || "<div style='color:#6b7280;margin-top:10px'>هنوز یافته‌ای اضافه نشده است.</div>";

updateUreterStoneDistanceFields();
updateHydronephrosisFields();
updateRenalStoneMode();
updateRenalStoneHydroFields();
}

function updateUreterStoneDistanceFields(){
const loc=document.getElementById("usLocation")?.value;
document.getElementById("distanceFromUPJBox").classList.toggle("hidden",loc!=="یک‌سوم پروگزیمال حالب");
document.getElementById("distanceFromUVJBox").classList.toggle("hidden",loc!=="یک‌سوم دیستال حالب");
}

function updateHydronephrosisFields(){
const h=document.getElementById("usHydronephrosis")?.value;
document.getElementById("apPelvisBox").classList.toggle("hidden",h==="ندارد");
}

function updateRenalStoneMode(){
const mode=document.getElementById("rsMode")?.value;
document.getElementById("rsSingleBox").classList.toggle("hidden",mode!=="single");
document.getElementById("rsMultipleBox").classList.toggle("hidden",mode!=="multiple");
document.getElementById("rsStaghornBox").classList.toggle("hidden",mode!=="staghorn");
}

function updateRenalStoneHydroFields(){
const h=document.getElementById("rsHydronephrosis")?.value;
document.getElementById("rsAPPelvisBox").classList.toggle("hidden",h==="ندارد");
}

function getUreterStoneData(){
return{
side:v("usSide"),
location:v("usLocation"),
stoneSize:v("usStoneSize"),
distanceFromUPJ:v("usDistanceFromUPJ"),
distanceFromUVJ:v("usDistanceFromUVJ"),
hydronephrosis:v("usHydronephrosis"),
apPelvisDiameter:v("usAPPelvisDiameter"),
hydroureter:v("usHydroureter"),
urinaryJet:v("usUrinaryJet")
};
}

function getRenalStoneData(){
let locations=[];
if(document.getElementById("rsStaghornUpper").checked)locations.push("کالیس فوقانی");
if(document.getElementById("rsStaghornMid").checked)locations.push("کالیس میانی");
if(document.getElementById("rsStaghornLower").checked)locations.push("کالیس تحتانی");
if(document.getElementById("rsStaghornPelvis").checked)locations.push("لگنچه");

return{
mode:v("rsMode"),
side:v("rsSide"),
singleLocation:v("rsSingleLocation"),
singleSize:v("rsSingleSize"),
count:v("rsCount"),
upperSize:v("rsUpperSize",""),
midSize:v("rsMidSize",""),
lowerSize:v("rsLowerSize",""),
pelvisSize:v("rsPelvisSize",""),
staghornLocations:locations.length?locations:["کالیس‌های کلیه"],
totalSize:v("rsTotalSize"),
hydronephrosis:v("rsHydronephrosis"),
apPelvisDiameter:v("rsAPPelvisDiameter")
};
}

function getProstateData(){
return{
mode:v("prMode"),
ml:v("prML"),
ap:v("prAP"),
cc:v("prCC"),
includeVolume:v("prIncludeVolume"),
transitionZone:v("prTransitionZone"),
medianLobe:v("prMedianLobe"),
medianLobeSize:v("prMedianLobeSize"),
calcification:v("prCalcification"),
calcificationType:v("prCalcificationType"),
calcificationLocation:v("prCalcificationLocation"),
prostatitisPattern:v("prProstatitisPattern")
};
}

function generateAbdomenReport(){
let report="";
let indication=v("indication","");

report+="نام و نام خانوادگی: "+v("patientName","")+"\n\n";
report+="سن: "+v("age","")+"\n\n";
if(indication!=="")report+="اندیکاسیون: "+indication+"\n\n";

if(findings.fattyLiver){
report+="افزایش مختصر اکوی پارانشیم کبد به نفع کبد چرب گرید I رویت شد. شواهدی از ضایعه فضاگیر یا اتساع مجاری صفراوی داخل و خارج کبدی رویت نشد.\n\n";
}else{
report+="کبد از نظر اندازه، اکوپترن و حدود طبیعی است. شواهدی از ضایعه فضاگیر یا اتساع مجاری صفراوی داخل و خارج کبدی رویت نشد.\n\n";
}

report+="کیسه صفرا از نظر اندازه، ضخامت جدار و محتویات طبیعی است.\n\n";
report+="طحال از نظر اندازه و اکوپترن طبیعی است.\n\n";
report+="پانکراس از نظر اندازه و اکوپترن طبیعی است.\n\n";

if(findings.ureterStone || findings.renalStone){
report+="کلیه راست به قطر طولی "+v("rkLength")+" میلی‌متر و ضخامت پارانشیم "+v("rkParenchyma")+" میلی‌متر و کلیه چپ به قطر طولی "+v("lkLength")+" میلی‌متر و ضخامت پارانشیم "+v("lkParenchyma")+" میلی‌متر اندازه‌گیری شدند. اکوی پارانشیم هر دو کلیه طبیعی بوده و افتراق کورتیکومدولاری حفظ شده است.\n\n";
if(findings.renalStone)report+=FINDING_BANK.renalStone.generateFindingText(getRenalStoneData())+"\n\n";
if(findings.ureterStone)report+=FINDING_BANK.ureterStone.generateFindingText(getUreterStoneData())+"\n\n";
}else{
report+="کلیه راست به قطر طولی "+v("rkLength")+" میلی‌متر و ضخامت پارانشیم "+v("rkParenchyma")+" میلی‌متر و کلیه چپ به قطر طولی "+v("lkLength")+" میلی‌متر و ضخامت پارانشیم "+v("lkParenchyma")+" میلی‌متر اندازه‌گیری شدند. اکوی پارانشیم هر دو کلیه طبیعی بوده و افتراق کورتیکومدولاری حفظ شده است. شواهدی از هیدرونفروز یا سنگ قابل مشاهده در کلیه‌ها رویت نشد.\n\n";
}

if(findings.bladderWall&&findings.bladderDebris){
report+="مثانه دارای ضخامت جدار مختصراً افزایش یافته، حدود "+v("bladderWallThickness")+" میلی‌متر است. چند دبری اکوژن مختصر شناور در داخل مثانه رویت شد که می‌تواند در زمینه هماتوری، پیوری یا کریستالوری باشد. در صورت صلاحدید بالینی، تطبیق با یافته‌های UA و UC توصیه می‌شود.\n\n";
}else if(findings.bladderWall){
report+="مثانه دارای ضخامت جدار مختصراً افزایش یافته، حدود "+v("bladderWallThickness")+" میلی‌متر است.\n\n";
}else if(findings.bladderDebris){
report+="مثانه دارای ضخامت جدار طبیعی است. چند دبری اکوژن مختصر شناور در داخل مثانه رویت شد که می‌تواند در زمینه هماتوری، پیوری یا کریستالوری باشد. در صورت صلاحدید بالینی، تطبیق با یافته‌های UA و UC توصیه می‌شود.\n\n";
}else{
report+="مثانه دارای ضخامت جدار و محتویات طبیعی است.\n\n";
}

if(currentGender==="male"){
if(findings.prostateEngine){
report+=FINDING_BANK.prostateEngine.generateFindingText(getProstateData())+"\n\n";
}else if(findings.bph){
report+="پروستات با حجم تقریبی "+v("prostateVolume")+" سی‌سی بزرگ‌تر از حد طبیعی بوده و نمای آن به نفع BPH است.\n\n";
}else{
report+="پروستات از نظر ابعاد و اکوپترن طبیعی است.\n\n";
}
}else{
report+="رحم از نظر اندازه و اکوپترن طبیعی است. ضخامت آندومتر "+v("endometriumThickness")+" میلی‌متر است. تخمدان‌های دو طرف از نظر اندازه و اکوپترن طبیعی بوده و ضایعه آدنکسال مشاهده نشد.\n\n";
}

if(findings.appendicitis){
report+="در ناحیه RLQ، آپاندیس با قطر حدود "+v("appendixDiameter")+" میلی‌متر، غیرقابل فشرده شدن و همراه با تغییرات التهابی چربی اطراف رویت شد که به نفع آپاندیسیت حاد است. در حد قابل ارزیابی، شواهدی از collection یا perforation مشاهده نشد.\n\n";
}

report+="ضایعه پاتولوژیک واضحی در فضای پاراآئورتیک رویت نشد.\n\n";
report+="مایع آزاد در حفره صفاقی مشاهده نشد.\n\n";
report+="نتیجه‌گیری:\n\n";

let imp=[];
if(findings.renalStone)imp.push(FINDING_BANK.renalStone.generateImpression(getRenalStoneData()));
if(findings.ureterStone)imp.push(FINDING_BANK.ureterStone.generateImpression(getUreterStoneData()));

if(currentGender==="male"&&findings.prostateEngine){
let prImp=FINDING_BANK.prostateEngine.generateImpression(getProstateData());
if(prImp)imp.push(prImp);
}

if(findings.appendicitis)imp.push("شواهد سونوگرافیک به نفع آپاندیسیت حاد با قطر حدود "+v("appendixDiameter")+" میلی‌متر و التهاب چربی اطراف، بدون شواهد collection یا perforation در حد قابل ارزیابی");
if(findings.fattyLiver)imp.push("کبد چرب گرید I");
if(currentGender==="male"&&findings.bph)imp.push("بزرگی پروستات با حجم تقریبی "+v("prostateVolume")+" سی‌سی به نفع BPH");

if(findings.bladderWall&&findings.bladderDebris){
imp.push("افزایش خفیف ضخامت جدار مثانه همراه با چند دبری اکوژن شناور که می‌تواند در زمینه هماتوری، پیوری یا کریستالوری باشد؛ در صورت صلاحدید بالینی، تطبیق با یافته‌های UA و UC توصیه می‌شود");
}else if(findings.bladderWall){
imp.push("افزایش خفیف ضخامت جدار مثانه");
}else if(findings.bladderDebris){
imp.push("چند دبری اکوژن شناور در مثانه که می‌تواند در زمینه هماتوری، پیوری یا کریستالوری باشد؛ در صورت صلاحدید بالینی، تطبیق با یافته‌های UA و UC توصیه می‌شود");
}

report+=imp.length?imp.join(". ")+".":"سونوگرافی شکم و لگن در حد بررسی انجام‌شده طبیعی است.";
document.getElementById("report").value=report;
}

function copyReport(){
const report=document.getElementById("report");
report.select();
report.setSelectionRange(0,99999);
navigator.clipboard.writeText(report.value);
alert("گزارش کپی شد.");
}

function clearForm(){
document.querySelectorAll("input").forEach(el=>{if(el.type==="checkbox")el.checked=false;else el.value=""});
document.getElementById("indication").value="";
document.getElementById("report").value="";
Object.keys(findings).forEach(f=>findings[f]=false);
setGender("male");
renderFindings();
}

renderFindings();
