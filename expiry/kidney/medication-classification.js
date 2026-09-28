/* Frontend classification from ADMINSTAION DATABASE.xlsx, Medication Database.
 * User-defined fills: red = High Alert; green = Refrigerated; yellow = both.
 * High Alert: 29 names (28 red + 1 yellow); Refrigerated: 11 (10 green + 1 yellow).
 * Exact normalized-name matching only; no clinical inference or fuzzy matching.
 * Keep both pages on this single source. No medication IDs or QR data are changed.
 */
(function(){
  "use strict";
  const highAlertNames = [
  "Apixaban 2.5mg Tablet",
  "Enoxaparin 6000 IU (60mg) inj",
  "Promethazine inj",
  "Labetalol 100mg inj",
  "Noradrenaline vial",
  "Adrenaline vial",
  "Adenosine vial",
  "Procainamide vial",
  "Dobutamine vial",
  "Warfarine 5mg Tab",
  "Magnisium Sulphate vial",
  "Lidocaine 1% vial",
  "Amiodarone inj",
  "Warfarine 2mg Tab",
  "Potassium Chloride 15% amp",
  "Lidocaine 2% syrinje",
  "Calcium Gluconate 10% amp",
  "Warfarine 1mg Tab",
  "Heparin Sodium 25,000 IU/5ml in 5ml vial",
  "Lidocaine 2% vial",
  "Reteplase inj 18mg",
  "Enoxaparin 2000 IU (20mg) inj",
  "Enoxaparin 4000 IU (40mg) inj",
  "Metoprolol inj",
  "Digoxin 250mcg inj",
  "Apixaban 5mg Tablet",
  "Enoxaparin 8000 IU (80mg) inj",
  "Vasopressin inj",
  "Calcium chloride inj 10%"
];
  const refrigeratedNames = [
  "Caspofungin 50mg inj",
  "Darbepoetin 40 inj",
  "Darbepoetin 60 inj",
  "Darbepoetin 80 inj",
  "Methoxy polyethylene glycol 100 mcg inj",
  "Alfacalcidol 1mcg inj",
  "Patiromer 8,4g powder",
  "Methoxy polyethylene glycol 50mcg inj",
  "Patiromer 16,8g powder",
  "Epoetin beta 4000 IU vial",
  "Reteplase inj 18mg"
];
  function normalizeMedicationKey(value){
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*([%/.,()+-])\s*/g, "$1")
    .replace(/(\d)\s+(mg|mcg|g|ml|l|iu|unit|units|%)/g, "$1$2")
    .replace(/\b(tablet|tablets|tab|tabs)\b/g, "tab")
    .replace(/\b(capsule|capsules|cap|caps)\b/g, "cap")
    .replace(/\b(injection|injections|inj)\b/g, "inj")
    .replace(/\b(syrup|syp)\b/g, "syp")
    .replace(/\b(solution|sol)\b/g, "sol")
    .replace(/\b(suspension|susp)\b/g, "susp")
    .replace(/\b(ointment|oint)\b/g, "oint")
    .replace(/\b(cream|cr)\b/g, "cr")
    .replace(/\b(inhaler|inh)\b/g, "inh")
    .replace(/\b(ampoule|ampoules|amp)\b/g, "amp")
    .replace(/\b(vial|vials)\b/g, "vial")
    .replace(/\b(drop|drops)\b/g, "drops")
    .replace(/\b(suppository|suppositories|supp)\b/g, "supp")
    .replace(/\b(powder|pwd)\b/g, "pwd")
    .replace(/\b(spray|spr)\b/g, "spr")
    .trim();
}
  const highAlert = new Set(highAlertNames.map(normalizeMedicationKey));
  const refrigerated = new Set(refrigeratedNames.map(normalizeMedicationKey));
  window.KidneyMedicationClassification = Object.freeze({
    isHighAlertMedication:function(name){
      return highAlert.has(normalizeMedicationKey(name));
    },
    isRefrigeratedMedication:function(name){
      return refrigerated.has(normalizeMedicationKey(name));
    }
  });
})();
