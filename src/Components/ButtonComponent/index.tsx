import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface ButtonProps {
    title?: string
    icon?: React.ReactNode
    onClick: () => any
    type: 'primary' | 'secondary' | 'text'
    disabled?: boolean
    size?: 'small' | 'regular'
    isLoading?: boolean
    customStyle?:React.CSSProperties
    className?:string
    endIcon?: React.ReactNode
}

const ButtonComponent = (props: ButtonProps) => {
    const {
        title,
        onClick,
        type,
        disabled,
        icon,
        size = "regular",
        isLoading = false,
        customStyle,
        className,
        endIcon
    } = props;
    return (
        <Button
            className={className}
            style={customStyle}
            variant={type}
            onClick={() => onClick()}
            disabled={disabled || isLoading}
            {...(icon ? {
                startIcon: icon
            } : {})}
            {...(endIcon ? {
                endIcon: endIcon
            } : {})}
            sx={{ height: (size == 'small') ? '36px' : '100%' }}
        >
            <>
                {isLoading && <CircularProgress color={type === 'primary'  ? 'primary' : 'secondary'}/>}
                <span style={{marginLeft:5,marginRight:2}}>{title}</span>
            </>
        </Button>
    );
};

export default ButtonComponent;
