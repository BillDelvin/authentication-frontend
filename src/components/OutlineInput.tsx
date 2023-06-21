import { MouseEventHandler, ReactElement, CSSProperties } from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const controllerComponent = (
  inputName: string,
  control: Control<FieldValues, any>,
  defaultValue: any,
  func: ({ field }: any) => ReactElement,
  rules?: object
) => {
  return (
    <Controller
      control={control}
      name={inputName}
      render={func}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

const errorMessageDsplay = (text: string) => (
  <p
    style={{
      color: "red",
      fontSize: 12,
      marginTop: 5,
      marginLeft: 5,
      marginBottom: 0,
      fontWeight: "bold",
    }}
  >
    {text}
  </p>
);

type OutlineInputProps = {
  control: Control<FieldValues, any>;
  inputName: string;
  label: string;
  errors: boolean;
  rules: object;
  inputType?: string;
  size?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
  placeholder?: string;
  helperText?: string | any;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
  inputProps?:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | undefined;
  style?: object;
};

export const OutlineInput = ({
  control,
  inputName,
  label,
  errors,
  rules,
  inputType = "text",
  onKeyDown,
  size = "small",
  placeholder,
  helperText,
  multiline = false,
  minRows = 1,
  disabled = false,
  style,
  inputProps,
}: OutlineInputProps) => {
  return controllerComponent(
    inputName,
    control,
    "",
    ({ field }) => (
      <TextField
        {...field}
        size={size}
        placeholder={placeholder}
        error={errors}
        id={inputName}
        label={label}
        fullWidth
        helperText={helperText}
        sx={style}
        disabled={disabled}
        multiline={multiline}
        minRows={minRows}
        type={inputType}
        onKeyDown={onKeyDown}
        InputProps={inputProps}
      />
    ),
    rules
  );
};

type OutlineInputPassProps = {
  control: Control<FieldValues, any>;
  inputName: string;
  label: string;
  showPass: boolean;
  errors: boolean;
  onTap: () => void;
  errorMessage?: ReactElement;
  rules: object;
  size?: string;
  disabled?: boolean;
  placeholder?: string;
  style?: object;
};

export const OutlineInputPassword = ({
  control,
  inputName,
  label,
  showPass,
  errors,
  onTap,
  errorMessage,
  rules,
  size = "small",
  disabled = false,
  placeholder,
  style,
}: OutlineInputPassProps) => {
  return (
    <>
      {controllerComponent(
        inputName,
        control,
        "",
        ({ field }) => (
          <FormControl
            error={errors}
            variant="outlined"
            {...field}
            fullWidth
            sx={style}
            size={size}
            disabled={disabled}
          >
            <InputLabel htmlFor={inputName}>{label}</InputLabel>
            <OutlinedInput
              id={inputName}
              type={showPass ? "text" : "password"}
              placeholder={placeholder}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onTap} edge="end">
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
            />
            <FormHelperText error={errors} children={errorMessage} />
          </FormControl>
        ),
        rules
      )}
    </>
  );
};

type OutlineSelectInputProps = {
  control: Control<FieldValues, any>;
  inputName: string;
  label: string;
  displayValue: false | JSX.Element[];
  displayMessage: JSX.Element;
  errors: boolean;
  rules: object;
  onTap?: MouseEventHandler<HTMLDivElement> | undefined;
  size?: "small" | "medium" | undefined;
  disabled?: boolean;
  placeholder?: string;
  inputStyle?: object;
  inputContainerStyle?: CSSProperties;
};

export const OutlineSelectInput = ({
  control,
  inputName,
  label,
  displayValue,
  displayMessage,
  errors,
  rules,
  onTap,
  size = "medium",
  disabled = false,
  inputStyle = { mb: 0 },
  inputContainerStyle = { marginBottom: 10 },
}: OutlineSelectInputProps) => {
  return (
    <>
      {controllerComponent(
        inputName,
        control,
        "",
        ({ field, fieldState: { error } }) => (
          <div style={inputContainerStyle}>
            <FormControl fullWidth sx={inputStyle} error={errors} disabled={disabled} size={size}>
              <InputLabel id={inputName}>{label}</InputLabel>
              <Select {...field} labelId={label} id={inputName} label={label} onClick={onTap}>
                {displayMessage}
                {displayValue}
              </Select>
            </FormControl>
            {error !== undefined && errorMessageDsplay(error.message)}
          </div>
        ),
        rules
      )}
    </>
  );
};
