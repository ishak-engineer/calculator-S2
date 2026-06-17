function calculate() {
  const table = document.getElementById("gradesTable");
  let totalWeighted = 0;
  let totalCoeff = 0;
  let totalCredits = 0;

  // Loop through rows with module data
  for (let i = 2; i < table.rows.length - 4; i++) {
    const row = table.rows[i];
    if (row.cells.length === 6 && row.cells[1].innerText) {
      const coeff = parseFloat(row.cells[1].innerText);
      const credit = parseFloat(row.cells[2].innerText);
      const td = parseFloat(row.cells[3].children[0].value) || 0;
      const exam = parseFloat(row.cells[4].children[0].value) || 0;

      // Calculate average per module
      const avg = (td + exam) / 2;
      row.cells[5].innerText = avg.toFixed(2);

      // Weighted totals
      totalWeighted += avg * coeff;
      totalCoeff += coeff;
      totalCredits += credit;
    }
  }

  // Overall average
  const overallAvg = totalWeighted / totalCoeff;
  document.getElementById("totalWeighted").innerText = totalWeighted.toFixed(2);
  document.getElementById("average").innerText = overallAvg.toFixed(2);

  // Credits & result logic
  if (overallAvg >= 10) {
    document.getElementById("credits").innerText = 30;
    document.getElementById("result").innerText = "Admis";
  } else {
    document.getElementById("credits").innerText = totalCredits;
    document.getElementById("result").innerText = "Adjourn";
  }
}

function savePDF() {
  const element = document.getElementById("gradesTable");
  const opt = {
    margin: 0.5,
    filename: 'Semester_Average.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
  };
  html2pdf().set(opt).from(element).save();
}
