import { Link, Form, redirect, useNavigation, useNavigate, } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/CustomFetch";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";

export const action = (queryClient: QueryClient) => async ({ request }: any) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    queryClient.invalidateQueries()
    toast.success("Login successful");
    return redirect("/dashboard")
  } catch (error: any) {
     toast.error(error?.response?.data?.msg);
     return error;
  }
}

export const Login = () => {
  const navigation = useNavigation();
  console.log(navigation.state)
  const isSubmitting = navigation.state === "submitting"
    const navigate = useNavigate();
    const loginDemoUser = async () => {
      const data = {
        email: "test@test.com",
        password: "secret123",
      };
      try {
        await customFetch.post("/auth/login", data);
        toast.success("take a test drive");
        navigate("/dashboard");
      } catch (error: any) {
        toast.error(error?.response?.data?.msg);
      }
    };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="peter@gmail.com" />
        <FormRow type="password" name="password" defaultValue="peterade" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
