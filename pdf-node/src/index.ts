import { generatePDF } from "pdf-node";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface User {
  name: string;
  age: number;
  email: string;
}

type PDFResult = { buffer: Buffer } | { filename: string };

async function generateUserReport(): Promise<void> {
  const html = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");

  const users: User[] = [
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
  ];

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
      height: "15mm",
      contents: '<div style="text-align: center;">Confidential Report</div>',
    },
    footer: {
      height: "15mm",
      contents: {
        default:
          '<div style="text-align: center; color: #666;">Page {{page}} of {{pages}}</div>',
      },
    },
  };

  try {
    const result = await generatePDF({
      html: html,
      data: {
        users: users,
        date: new Date().toLocaleDateString(),
      },
      buffer: true,
      pdfOptions: options,
    });

    if ("buffer" in result) {
      fs.writeFileSync("user-report-buffer.pdf", result.buffer);
      console.log("PDF generated from buffer");
    }

    if ("filename" in result) {
      console.log("PDF generated at:", result.filename);
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

generateUserReport();
