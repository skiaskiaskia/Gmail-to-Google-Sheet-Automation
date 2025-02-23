function createLabelSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const addressSheet = ss.getSheetByName("Addresses");
  const templateSheet = ss.getSheetByName("template");
  
  // 1) Check how many rows of data we have in "Addresses"
  const lastRow = addressSheet.getLastRow();
  if (lastRow < 2) {
    // No data beyond the header row
    return;
  }

  // 2) Loop from row 2 downward
  for (let row = 2; row <= lastRow; row++) {
    
    // Check column K = 11 for the label flag
    const labelFlag = addressSheet.getRange(row, 11).getValue(); // "Yes", "No", or blank
    if (labelFlag !== "Yes") {
      // Skip if not "Yes"
      continue;
    }

    // 3) Retrieve the address fields from columns B..J
    //    Adjust these column references if your layout differs.
    const nameVal     = addressSheet.getRange(row,  2).getValue(); // B: Name
    const uniqueKey   = addressSheet.getRange(row,  3).getValue(); // C: Unique Key (sheet name)
    const streetVal   = addressSheet.getRange(row,  4).getValue(); // D: Street & Number
    const unitVal     = addressSheet.getRange(row,  5).getValue(); // E: Unit
    const detail2Val  = addressSheet.getRange(row,  6).getValue(); // F: Detail 2
    const cityVal     = addressSheet.getRange(row,  7).getValue(); // G: City
    const provinceVal = addressSheet.getRange(row,  8).getValue(); // H: Province
    const postalVal   = addressSheet.getRange(row,  9).getValue(); // I: Postal Code
    const phoneVal    = addressSheet.getRange(row, 10).getValue(); // J: Phone/Detail 3

    // If there's no unique key, skip creating a sheet
    if (!uniqueKey) {
      continue;
    }

    // 4) Copy the "template" sheet
    const newSheet = templateSheet.copyTo(ss);
    
    // 5) Rename the copied sheet using the unique key
    newSheet.setName(uniqueKey);

    // 6) Optionally combine city + province
    const cityProvince = (cityVal || "") +
      (cityVal && provinceVal ? ", " : "") +
      (provinceVal || "");

    /*
     * 7) Fill the template cells:
     *    Suppose we place:
     *      Name -> C5
     *      Street -> C6
     *      Unit -> C7
     *      Detail2 -> C8
     *      City/Prov -> C9
     *      Postal -> C10
     *      Phone -> C11
     *    Adjust if your actual template differs.
     */
    newSheet.getRange("C5").setValue(nameVal);
    newSheet.getRange("C6").setValue(streetVal);
    newSheet.getRange("C7").setValue(unitVal);
    newSheet.getRange("C8").setValue(detail2Val);
    newSheet.getRange("C9").setValue(cityProvince);
    newSheet.getRange("C10").setValue(postalVal);

    // Only fill phone if present
    if (phoneVal) {
      newSheet.getRange("C11").setValue(phoneVal);
    } else {
      newSheet.getRange("C11").clearContent();
    }
  }
}
