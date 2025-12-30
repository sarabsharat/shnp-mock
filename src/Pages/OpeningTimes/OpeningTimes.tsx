import Box from "@mui/material/Box";
import { WorkingHours } from "../../Components/WorkingHours.tsx";

export const OpeningTimes = () => {
    return (
        <Box sx={{ width: "100%",minWidth:"1000px", minHeight: "100%" }}>
            <WorkingHours />
        </Box>
    );
};