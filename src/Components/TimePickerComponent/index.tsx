import { Box, MenuItem, Select, Typography, Stack } from '@mui/material';

interface TimeSelectProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
}

export const TimeSelect = ({ label, value, onChange }: TimeSelectProps) => {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = ['00', '15', '30', '45'];
    const [h, m] = value.split(':');

    return (
        <Box sx={{ flex: 1 }}>
            <Typography variant="label" sx={{ display: 'block', mb: 1 }}>{label}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <Select
                    value={h}
                    onChange={(e) => onChange(`${e.target.value}:${m}`)}
                    fullWidth
                    size="small"
                >
                    {hours.map((hour) => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
                </Select>
                <Typography variant="label" sx={{ px: 0.5 }}>:</Typography>
                <Select
                    value={m}
                    onChange={(e) => onChange(`${h}:${e.target.value}`)}
                    fullWidth
                    size="small"
                >
                    {minutes.map((min) => <MenuItem key={min} value={min}>{min}</MenuItem>)}
                </Select>
            </Stack>
        </Box>
    );
};