import '../App.css'
import {useCallback, useState} from "react";
import {Field, useField} from 'formik';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import type {InputType} from "../Pages/Registry/Interface.tsx";

function Input({
                   label, id, placeholder, type, name,icon, ...rest
               }: InputType) {
    //formik
    const [field, meta] = useField(name);
    const displayError = meta.error;
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const isSelectField = type === "select";
    const isPhoneField = type === "phone";
    const finalInputType = isPasswordField ? (showPassword ? "text" : "password") : type;
    const selected = field.value as number[] || [];
    const [showDropdown, setShowDropdown] = useState(false);
    const options = [{id:1,name:"Healthy food"},
        {id:2,name:"thing"},
        {id:3,name:"stuff"}]


    //region icons
    const eye = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
        </svg>);

    const human = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-user-icon lucide-user">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>)

    const lock= (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-lock-icon lucide-lock">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>)

    const hide = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>);
    const del = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="size-5 text-shnp-orange z-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>);
    const arrow = (<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 transition-transform ${showDropdown ? "rotate-180" : ""}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
        </svg>);
    //endregion

    //region handlers
    const handlePhoneChange = (phoneValue: string) => {
        field.onChange({
            target: {
                name: name, value: phoneValue,
            },
        });
    };
    const handlePhoneBlur = () => {
        field.onBlur({
            target: {
                name: name,
            }
        })
    }
    const handleToggle = useCallback((option: number) => {
        let newSelected: number[];
        if (selected.includes(option)) {
            newSelected = selected.filter((item) => item !== option);
        } else {
            newSelected = [...selected, option];
        }
        field.onChange({
            target: {
                name: name, value: newSelected,
            },
        });
        field.onBlur({target: {name: name}});

    }, [name, selected, field.onChange, field.onBlur]);
    const deleteOption = useCallback((option: number) => {
        const newSelected = selected.filter((item) => item !== option);
        field.onChange({
            target: {
                name: name, value: newSelected,
            },
        });
    }, [name, selected, field.onChange]);
    //endregion
    const toggleVisibility = () => {
        setShowPassword(prev => !prev);
    };


    return (<div className="relative w-full text-left">
            <label htmlFor={id} className="text-left text-md  md:text-sm 2xl:text-2xl">
                {label} {rest.required && <span className="text-shnp-orange">*</span>}

                {isSelectField ? (

                    <div className="relative w-full">
                        <div
                            className={`text-[#9E9E9E] h-fit flex justify-between min-w-0 border rounded-xl 
                        '[border-color:#9E9E9E]'} px-[14px] py-[16px] cursor-pointer`}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="flex flex-wrap items-start gap-2">
                                {selected.length > 0 ? (
                                    selected.map((selectedId) => {
                                        const optionName = options.find(o => o.id === selectedId)?.name;
                                        return (
                                            <div
                                                key={selectedId}
                                                className="flex items-center gap-1 bg-[#fafafa] border border-shnp-orange text-shnp-orange text-sm rounded-full px-3 py-1"
                                            >
                                                <span>{optionName}</span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteOption(selectedId);
                                                    }}>
                                                    {del}
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (<span className="text-[#9E9E9E] opacity-70 text-xs mt-1 2xl:text-lg">{placeholder}</span>)}
                            </div>
                            <div className="items-end">{arrow}</div>
                        </div>

                        {showDropdown && (
                            <ul className="absolute w-full bg-white border border-[#9e9e9e] rounded-xl mt-1 max-h-40 z-10 overflow-y-auto shadow-lg">
                                {options.map((option) => (
                                    <li
                                        key={option.id}
                                        className={`
                                            flex items-center gap-2 px-3 py-2 cursor-pointer text-sm
                                            transition-colors duration-100
                                            rounded-lg
                                            ${selected.includes(option.id) ? " border-shnp-orange text-shnp-orange" : "hover:bg-gray-100"}
                                        `}

                                        onClick={() => handleToggle(option.id)}
                                    >
                                        <div className={`
                                         w-5 h-5 rounded-md flex justify-center items-center
                                         border
                                         ${selected.includes(option.id) ? "bg-shnp-orange border-shnp-orange" : "border-[#9E9E9E] bg-white"}
                                    `}>
                                            {selected.includes(option.id) && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={3}
                                                    stroke="white"
                                                    className="w-4 h-4"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                                </svg>
                                            )}
                                        </div>

                                        {/* Display the Name */}
                                        <span>{option.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>): (<div className="relative w-full flex">
                        {isPhoneField ? (<div className="relative w-full">
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    onChange={handlePhoneChange}
                                    onBlur={handlePhoneBlur}
                                    value={field.value as string || ''}
                                    disableDropdown={true}
                                    disableCountryCode={false}
                                    countryCodeEditable={false}
                                    country={"sa"}
                                    inputStyle={{
                                        width: "100%", height: "3.9em", boxSizing: "border-box"
                                    }}
                                    inputProps={{
                                        name: field.name, required: true,
                                    }}
                                /></div>

                        ) : (

                            <Field
                                className={`
                        text-[#9E9E9E] box-content h-[1.5em] block min-w-0 w-full border rounded-xl bg-[#fafafa] m-0 py-[16px] 
                        placeholder:text-xs placeholder:md:text-sm placeholder:2xl:text-2xl
                        focus:outline-none focus:ring-0
                        ${icon ? 'ps-10 pe-[14px]' : 'px-[14px]'}
                        ${displayError}
                    `}
                                id={id}
                                {...field}
                                value={field.value as string || ''}
                                type={finalInputType}
                                placeholder={placeholder}
                                {...rest}/>)}

                    {icon &&(<span className="absolute top-1/2 -translate-y-1/2
  [inset-inline-start:0.55rem] [padding-inline-end:0.75rem]
  text-[#9E9E9E] hover:text-shnp-orange">{icon==="human" ? human : lock}</span>)}
                        {isPasswordField && (<button
                                type="button"
                                onClick={toggleVisibility}

                                className="absolute top-1/2 -translate-y-1/2
  [inset-inline-end:0] [padding-inline-end:0.75rem]
  text-[#9E9E9E] hover:text-shnp-orange"
                            >
                                {showPassword ? hide : eye}
                            </button>)}
                    </div>)}</label>
            {displayError && (<p
                    id={`${id}-error`}
                    className="text-red-500 text-xs text-clip [inset-inline-start:0.55rem] [padding-inline-end:0.75rem] mt-1 absolute left-0 top-full 2xl:text-lg"
                >
                    {Array.isArray(meta.error) ? meta.error.join(', ') : meta.error}
                </p>)}
        </div>);
}

export default Input
