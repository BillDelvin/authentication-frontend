import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Button, Box, Card, CardContent, CardActions } from "@mui/material";
import { OutlineInput, OutlineInputPassword } from "../../components/OutlineInput";
import Swal from "sweetalert2";

// redux
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { showPassword, login, setUserData } from "../../app/slicers/auth";

const Signin = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const { isLoading, isShowPassword } = useAppSelector((state) => state.auth);

  const onSubmit = (data: any) => {
    const value = {
      username: data.username?.trim(),
      password: data.password?.trim(),
    };

    dispatch(login(value))
      .unwrap()
      .then(() => {
        dispatch(setUserData());
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => Swal.fire("Oops...", err.message, "error"));
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 430 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                {OutlineInput({
                  control,
                  inputName: "username",
                  label: "Username",
                  errors: errors.username !== undefined,
                  helperText: errors.username && errors.username?.message,
                  rules: {
                    required: { value: true, message: "Required!" },
                    pattern: {
                      value: /^[a-z]*$/,
                      message:
                        "Invalid username, tidak boleh ada spasi, angka, huruf kapital dan simbol!",
                    },
                  },
                  style: { mb: 2 },
                  placeholder: "Username",
                  size: "normal",
                  disabled: isLoading,
                })}
                {OutlineInputPassword({
                  control,
                  inputName: "password",
                  label: "Password",
                  showPass: isShowPassword,
                  errors: errors.password !== undefined,
                  onTap: () => dispatch(showPassword()),
                  rules: { required: true },
                  size: "normal",
                  style: {},
                  disabled: isLoading,
                })}
              </CardContent>
              <CardActions sx={{ justifyContent: "center", flexDirection: "column" }}>
                <Button type="submit" variant="contained" disabled={isLoading}>
                  Login
                </Button>
              </CardActions>
            </form>
            <Box sx={{ p: 1, textAlign: "center" }}>
              <Button type="button" sx={{ mb: 3 }} disabled={isLoading}>
                <NavLink to="/register" style={{ textDecoration: "none" }}>
                  Register
                </NavLink>
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Signin;
