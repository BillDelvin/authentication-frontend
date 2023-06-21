import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Button, Card, CardContent, CardActions, Box } from "@mui/material";
import { OutlineInput, OutlineInputPassword } from "../../components/OutlineInput";
import Swal from "sweetalert2";

// redux
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { showConfPassword, showPassword, register } from "../../app/slicers/auth";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isShowPassword, isShowConfPassword } = useAppSelector((state) => state.auth);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    const value = {
      username: data.username.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    if (value.password !== value.confirmPassword) {
      Swal.fire("Oops..", "Password not match!!", "error");
      return;
    }

    dispatch(register(value))
      .unwrap()
      .then((res) => {
        Swal.fire("", res.msg, "success");
        navigate("/");
        reset();
      })
      .catch((err) => {
        Swal.fire("Oops...", err.message, "error");
      });
  };

  return (
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
                helperText:
                  errors.username && errors.username.type === "required" && "Field dibutuhkan!",
                rules: { required: true },
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
                style: { mb: 2 },
                disabled: isLoading,
              })}
              {OutlineInputPassword({
                control,
                inputName: "confirmPassword",
                label: "Confirm Password",
                showPass: isShowConfPassword,
                errors: errors.confirmPassword !== undefined,
                onTap: () => dispatch(showConfPassword()),
                rules: { required: true },
                size: "normal",
                style: {},
                disabled: isLoading,
              })}
            </CardContent>
            <CardActions sx={{ justifyContent: "center", flexDirection: "column" }}>
              <Button type="submit" variant="contained" disabled={isLoading}>
                Register
              </Button>
            </CardActions>
          </form>
          <Box sx={{ p: 1, textAlign: "center" }}>
            <Button type="button" sx={{ mb: 3 }} disabled={isLoading}>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                Log in
              </NavLink>
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Signup;
