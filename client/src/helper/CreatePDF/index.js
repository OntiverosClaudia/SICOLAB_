import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const printDocument = (tempFile, fileName) => {
  html2canvas(tempFile.current).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    let imgWidth = 200;
    let pageHeight = 295;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let doc = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    doc.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
    heightLeft -= pageHeight - 7;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    doc.save(fileName);
  });
}; //

export default printDocument;
