export type DocType = "trademark" | "commercial" | "registry" | "certificate";

export interface PendingDocument {
    name: string;
    file: File;
    previewUrl: string;
}

export interface RestaurantDocument {
    documentTypeCode: string;
    urls: string[];
    driverId: number;
    documentType: null;
}

export const DOCUMENT_TYPE_CODES: Record<DocType, string> = {
    trademark: "Trademark",
    commercial: "CommercialLicenseNumber",
    registry: "CompanyTaxRegistryRepresentative",
    certificate: "TaxCertificateNumber",
};