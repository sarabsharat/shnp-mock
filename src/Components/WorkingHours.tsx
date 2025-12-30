import { useState, useMemo } from 'react';
import ButtonComponent from "./ButtonComponent";
import {
    Box,
    Switch,
    FormControlLabel,
    IconButton,
    Typography,
    FormGroup,
    Stack,
    Grid,
    ThemeProvider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { theme } from "../theme.tsx";
import { notifySuccess,notifyError } from "../utilities/Notify.ts";
import { useClock } from "../Hooks/useClock.tsx";
import AddNewTimeModal from "./AddNewTimeModal";

interface OpeningTimesDetails {
    day: number;
    from: string;
    to: string;
}

interface ModalState {
    isOpen: boolean;
    dayIndex: number;
    slotIndex?: number;
}

interface DayRowProps {
    dayName: string;
    index: number;
    days: OpeningTimesDetails[];
    setDays: React.Dispatch<React.SetStateAction<OpeningTimesDetails[]>>;
    onOpenModal: (dayIndex: number, slotIndex?: number) => void;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DayRow = ({ dayName, index, days, setDays, onOpenModal }: DayRowProps) => {
    const { formatDisplayTime } = useClock();
    const todaysTimes = useMemo(() => days.filter((item) => item.day === index), [days, index]);
    const isDayEnabled = days.some((x) => x.day === index);

    const toggleDay = (checked: boolean) => {
        if (checked) {
            setDays((prev) => [...prev, { day: index, from: '08:00', to: '22:00' }]);
        } else {
            setDays((prev) => prev.filter((x) => x.day !== index));
        }
    };

    const handleDelete = (slotIndex: number) => {
        setDays((prev) => {
            const dayInstances = prev.filter(d => d.day === index);
            const targetInstance = dayInstances[slotIndex];
            return prev.filter(item => item !== targetInstance);
        });
    };

    return (
        <Box sx={{
            width: '100%', mb: 2, p: { xs: 2, md: 2.5 }, borderRadius: '12px',
            border: `2px solid ${theme.palette.primary.main}`, bgcolor: 'background.paper',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: todaysTimes.length > 0 ? 2 : 0 }}>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={isDayEnabled} onChange={(e) => toggleDay(e.target.checked)} color="primary" />}
                        label={<Typography variant="label">{dayName}</Typography>}
                    />
                </FormGroup>
                {isDayEnabled && (
                    <IconButton color="primary" onClick={() => onOpenModal(index)}>
                        <AddIcon />
                    </IconButton>
                )}
            </Box>
            <Stack spacing={2}>
                {todaysTimes.map((slot, i) => (
                    <Box key={`${index}-${i}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Stack direction="row" spacing={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="label" sx={{ mr: 1 }}>From:</Typography>
                                <Typography variant="body1">{formatDisplayTime(slot.from)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="label" sx={{ mr: 1 }}>To:</Typography>
                                <Typography variant="body1">{formatDisplayTime(slot.to)}</Typography>
                            </Box>
                        </Stack>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton onClick={() => handleDelete(i)} sx={{ color: '#EA4335' }} size="small"><DeleteIcon /></IconButton>
                            <IconButton onClick={() => onOpenModal(index, i)} sx={{ color: '#4BA494' }} size="small"><EditIcon /></IconButton>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export const WorkingHours = () => {
    const { isOverlap, t } = useClock();
    const [daysData, setDaysData] = useState<OpeningTimesDetails[]>(
        daysOfWeek.map((_, index) => ({ day: index, from: '08:00', to: '22:00' }))
    );
    const [modal, setModal] = useState<ModalState>({ isOpen: false, dayIndex: 0 });

    const handleSaveTime = (hours: { from: string, to: string }) => {

        const otherSlotsOnSameDay = daysData.filter((d, ) => {
            const dayInstances = daysData.filter(item => item.day === modal.dayIndex);
            const currentSlotBeingEdited = dayInstances[modal.slotIndex ?? -1];
            return d.day === modal.dayIndex && d !== currentSlotBeingEdited;
        });

        if (isOverlap(hours.from, hours.to, otherSlotsOnSameDay)) {
            notifyError(t("openingTimes.errorOverlap") || "Overlap detected!");
            return;
        }

        setDaysData((prev) => {
            const updated = [...prev];
            if (modal.slotIndex !== undefined) {
                const dayInstances = updated.filter(d => d.day === modal.dayIndex);
                const target = dayInstances[modal.slotIndex];
                const globalIdx = updated.indexOf(target);
                updated[globalIdx] = { day: modal.dayIndex, ...hours };
            } else {
                updated.push({ day: modal.dayIndex, ...hours });
            }
            return updated;
        });
        setModal(prev => ({ ...prev, isOpen: false }));
    };

    const currentEditData = useMemo(() => {
        if (modal.slotIndex !== undefined) {
            const daySlots = daysData.filter(d => d.day === modal.dayIndex);
            return daySlots[modal.slotIndex];
        }
        return undefined;
    }, [modal, daysData]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', p: { xs: 2, md: 4 }, boxSizing: 'border-box' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>{t("openingTimes.openingTimes")}</Typography>
                <Stack spacing={1} sx={{ width: '100%' }}>
                    {daysOfWeek.map((day, index) => (
                        <DayRow key={day} dayName={day} index={index} days={daysData} setDays={setDaysData} onOpenModal={(d, s) => setModal({ isOpen: true, dayIndex: d, slotIndex: s })} />
                    ))}
                </Stack>
                <Grid container justifyContent={'flex-end'} sx={{ marginBottom: "6rem", mt: 4 }}>
                    <ButtonComponent type="primary" title={t("submit_btn")} onClick={() => notifySuccess(t("openingTimes.updateSuccess"))} />
                </Grid>
                <AddNewTimeModal
                    isOpen={modal.isOpen}
                    onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
                    onSave={handleSaveTime}
                    initialData={currentEditData}
                />
            </Box>
        </ThemeProvider>
    );
};