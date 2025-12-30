import { useTranslation } from "react-i18next";

export const useClock = () => {
    const { t } = useTranslation();

    const formatDisplayTime = (time: string | null) => {
        if (!time) return "--:--";
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours, 10);

        const ampm = h >= 12 ? t("openingTimes.pm") : t("openingTimes.am");
        const displayHours = h % 12 || 12;

        return `${displayHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    };

    const isValidInterval = (from: string, to: string) => {
        return from < to;
    };

    const isOverlap = (newFrom: string, newTo: string, existingSlots: {from: string, to: string}[]) => {
        return existingSlots.some(slot =>
            (newFrom >= slot.from && newFrom < slot.to) ||
            (newTo > slot.from && newTo <= slot.to) ||
            (newFrom <= slot.from && newTo >= slot.to)
        );
    };

    return { formatDisplayTime, isValidInterval, isOverlap, t };
};