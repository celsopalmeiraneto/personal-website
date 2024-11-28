import fs from "node:fs/promises";
import path from "node:path";

export interface ContactInformation {
  emailAddress: string;
  phoneNumber: string;
}

const CONTACT_INFO_FILE = path.resolve("data", "private", "contact-information.json");

export const getContactInformation = async (): Promise<ContactInformation> => {
  try {
    const file = await fs.readFile(path.resolve(CONTACT_INFO_FILE));
    const parsedContents = JSON.parse(file.toString());
    return parsedContents as ContactInformation;
  } catch (error) {
    console.error("Failed to read contact information file.", error);
    return {
      emailAddress: "hire@celsoneto.com.br",
      phoneNumber: "",
    };
  }
};
