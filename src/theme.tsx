import { createTheme } from "@mui/material";
import { arSA } from "@mui/material/locale";

// Fix: Move declarations to the top or a separate d.ts file to ensure they wrap the theme creation
declare module "@mui/material/styles" {
    interface PaletteColor {
        S300?: string;
        lightGray?: string;
        grayScale900?: string;
        grayScale50?: string;
        grayScale500?: string;
        grayScale100?: string;
        grayScale300?: string;
        grayScale200?: string;
        grayScale800?: string;
        naturalColor?: string;
        natural3Color?: string;
        blueB?: string;
        purpleA?: string;
        greenA?: string;
        yellow?: string;
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        primary: true;
        secondary: true;
        danger: true;
        text: true;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        label: true;
        error: true;
    }
}

export const theme = createTheme(
    {
        components: {
            MuiTypography: {
                variants: [
                    {
                        props: { variant: "error" },
                        style: {
                            fontSize: " 0.75rem",
                            color: "red",
                            marginTop: "0.3rem",
                        },
                    },
                    {
                        props: { variant: "label" },
                        style: {
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#212121",
                            marginBottom: "0.25rem", // Changed mb to marginBottom for standard CSS
                        },
                    },
                ],
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        height: "47px !important",
                        textTransform: "none",
                        borderRadius: "81.3464px", // Matches your requested radius
                        padding: "14.6423px 13.0154px",
                        fontWeight: 700,
                        fontSize: "16px",
                        border: "1px solid #fe7a25",
                        "&:hover": {
                            color: "#fe7a25",
                        },
                    },
                },
                variants: [
                    {
                        props: { variant: "primary" },
                        style: {
                            backgroundColor: "#fe7a25", // Your brand orange
                            color: "#FFFFFF",
                        },
                    },
                    {
                        props: { variant: "secondary" },
                        style: {
                            backgroundColor: "#fcf7e4",
                            color: "#fe7a25",
                        },
                    },
                ],
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        background: "#FAFAFA",
                        color: "#9E9E9E",
                        fontSize: "14px",
                    },
                },
            },
        },
        palette: {
            primary: {
                main: "#fe7a25",
                light: "#fcf7e4",
            },
        },
    },
    arSA
);