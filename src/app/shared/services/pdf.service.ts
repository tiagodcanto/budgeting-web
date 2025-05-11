import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {

  }

  generateGarmentReport(data: any[], currencySymbol: string) {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Garment Hour Estimate Report', 14, 20);

    // Subtitle
    doc.setFontSize(12);
    doc.text(`Currency: ${currencySymbol}`, 14, 30);

    // Table header + body
    const head = [['Garment', 'Level', 'Sketch (S/C/I)', 'Tech Design (S/C/I)', 'Tech Pack (S/C/I)']];
    const body = data.map(row => {
      const garment =
        row.garmentType === 'Other' ? row.customGarmentType : row.garmentType;
      return [
        garment,
        row.level,
        `${row.sketch.simple}/${row.sketch.complex}/${row.sketch.intricate}`,
        `${row.techDesign.simple}/${row.techDesign.complex}/${row.techDesign.intricate}`,
        `${row.techPack.simple}/${row.techPack.complex}/${row.techPack.intricate}`
      ];
    });

    autoTable(doc, {
      head: head,
      body: body,
      startY: 40
    });

    doc.save('garment-hours-report.pdf');
  }
}
