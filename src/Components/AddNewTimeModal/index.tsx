import { useState, useEffect } from 'react';
import Modal from "../Modal.tsx";
import { ThemeProvider, Stack, Box, Typography } from '@mui/material';
import { theme } from "../../theme.tsx";
import ButtonComponent from "../ButtonComponent/index.tsx";
import { TimeSelect } from "../TimePickerComponent";
import { useClock } from "../../Hooks/useClock.tsx";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (hours: { from: string; to: string }) => void;
    initialData?: { from: string; to: string };
    title?: string;
}

const AddNewTimeModal = ({ isOpen, onClose, onSave, initialData, title }: IProps) => {
    const [from, setFrom] = useState("08:00");
    const [to, setTo] = useState("22:00");
    const { isValidInterval, t } = useClock();

    useEffect(() => {
        if (isOpen) {
            setFrom(initialData?.from || "08:00");
            setTo(initialData?.to || "22:00");
        }
    }, [isOpen, initialData]);

    const isInvalid = !isValidInterval(from, to);

    if (!isOpen) return null;

    return (
        <ThemeProvider theme={theme}>
            <Modal onClose={onClose} text={title || t("openingTimes.openingTimes")}>
                <Box sx={{ p: 1 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 2 }}>
                        <TimeSelect label={t("openingTimes.from")} value={from} onChange={setFrom} />
                        <TimeSelect label={t("openingTimes.to")} value={to} onChange={setTo} />
                    </Stack>

                    {isInvalid && (
                        <Typography variant="error" sx={{ display: 'block' }}>
                            {t("openingTimes.errorInterval")}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                        <ButtonComponent
                            type="secondary"
                            title={t("cancel") || "Cancel"}
                            onClick={onClose}
                        />
                        <ButtonComponent
                            type="primary"
                            title={t("confirm") || "Confirm"}
                            disabled={isInvalid}
                            onClick={() => onSave({ from, to })}
                        />
                    </Stack>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default AddNewTimeModal;