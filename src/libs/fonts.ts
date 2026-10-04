import { Fira_Code, Poppins } from "next/font/google";

// Poppins has no variable version: load only the weights the type scale uses
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap"
});

// Fira Code is a variable font: one file covers every weight
export const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap"
});
