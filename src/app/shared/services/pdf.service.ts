import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() {

  }

  generateGarmentBudgetReport(
    garments: any[],
    presets: any[],
    additionalServices: {
      alignmentMeetings?: boolean;
      alignmentMeetingsCount?: number;
      taxEnabled?: boolean;
      taxPercent?: number;
      additionalExpenseEnabled?: boolean;
      additionalExpenseType?: 'number' | 'percentage';
      additionalExpenseValue?: number;
    },
    currencySymbol: string = '$',
    ratePerHour: any
  ): void {
    const doc = new jsPDF();

    // 🖼 Add logo (Make sure the logo path is correct and base64 or hosted)
    const logoImg = '../../../assets/images/logo.png'; // You can load this dynamically with base64 if needed
    doc.addImage(logoImg, 'PNG', 120, 10, 75, 20); // Optional if using base64 directly

    doc.setFontSize(18);
    doc.text('Garment Budget Summary', 14, 20);

    doc.setFontSize(12);
    doc.text(`Currency: ${currencySymbol}`, 14, 28);

    let totalGarmentsCost = 0;
    const tableBody: any[] = [];

    for (const garment of garments) {
      const preset = presets.find(p => p.garmentType === garment.garmentType);
      if (!preset) continue;

      const complexity = garment.complexity;
      const baseHours =
        preset.sketch[complexity] +
        preset.techDesign[complexity] +
        preset.techPack[complexity];

      const baseCost = baseHours * ratePerHour;

      totalGarmentsCost += baseCost;

      tableBody.push([
        garment.name,
        garment.garmentType,
        complexity,
        baseHours.toFixed(2),
        `${currencySymbol}${baseCost.toFixed(2)}`
      ]);
    }

    // Add total row
    tableBody.push([
      { content: 'TOTAL', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
      `${currencySymbol}${totalGarmentsCost.toFixed(2)}`
    ]);

    // Render table
    autoTable(doc, {
      startY: 36,
      head: [['Name', 'Garment Type', 'Complexity', 'Base Hours', 'Base Cost']],
      body: tableBody
    });

    // Calculate additional services
    let alignmentMeetingsTotal = 0;
    let taxTotal = 0;
    let additionalExpenseTotal = 0;

    if (additionalServices.alignmentMeetings) {
      alignmentMeetingsTotal = (additionalServices.alignmentMeetingsCount || 0) * 50;
    }

    if (additionalServices.taxEnabled) {
      const taxPercent = additionalServices.taxPercent || 0;
      taxTotal = (totalGarmentsCost * taxPercent) / 100;
    }

    if (additionalServices.additionalExpenseEnabled) {
      if (additionalServices.additionalExpenseType === 'number') {
        additionalExpenseTotal = additionalServices.additionalExpenseValue || 0;
      } else if (additionalServices.additionalExpenseType === 'percentage') {
        additionalExpenseTotal =
          ((additionalServices.additionalExpenseValue || 0) / 100) * totalGarmentsCost;
      }
    }

    const grandTotal =
      totalGarmentsCost + alignmentMeetingsTotal + taxTotal + additionalExpenseTotal;

    // Add summary section
    const finalY = (doc as any).lastAutoTable?.finalY || 50;
    const summaryY = finalY + 10;

    doc.setFontSize(14);
    doc.text('Additional Costs Summary', 14, summaryY);

    doc.setFontSize(12);
    doc.text(
      `Alignment Meetings: ${currencySymbol}${alignmentMeetingsTotal.toFixed(2)}`,
      14,
      summaryY + 8
    );
    doc.text(`Tax: ${currencySymbol}${taxTotal.toFixed(2)}`, 14, summaryY + 16);
    doc.text(
      `Additional Expense: ${currencySymbol}${additionalExpenseTotal.toFixed(2)}`,
      14,
      summaryY + 24
    );

    doc.setFontSize(14);
    doc.text(
      `Total Budget: ${currencySymbol}${grandTotal.toFixed(2)}`,
      14,
      summaryY + 34
    );

    doc.save('garment-budget-summary.pdf');
  }
}
