export const prepareUpdatePayload = (payload: any) => {

    const data = { ...payload };

    if (data.restaurantDocuments && !data.documents) {
        data.documents = data.restaurantDocuments;
    }
    delete data.restaurantDocuments;

    if (Array.isArray(data.documents)) {
        data.documents = data.documents.map((doc: any) => ({
            ...doc,
            driverId: doc.driverId || 0,
            documentType: doc.documentType || null,
            urls: Array.isArray(doc.urls)
                ? doc.urls.map((u: any) => (typeof u === 'object' && u?.location ? u.location : u))
                : []
        }));
    }

    if (data.imageUrl && typeof data.imageUrl === 'object') {
        data.imageUrl = data.imageUrl.location || "";
    }

    if (!data.registrationNumber) data.registrationNumber = "-";
    if (!data.managementPhoneNumber) data.managementPhoneNumber = "-";
    if (!data.bankAccountIban) data.bankAccountIban = "-";
    if (data.id) {
        data.id = Number(data.id);
    }

    Object.keys(data).forEach((key) => {
        if (data[key] === null || data[key] === undefined) {
            delete data[key];
        }
    });

    return data;
};
