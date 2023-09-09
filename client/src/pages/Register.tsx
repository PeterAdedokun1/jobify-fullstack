import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/CustomFetch";
export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.msg || "An error occurred");
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="peter" />
        <FormRow
          type="text"
          name="lastName"
          defaultValue="adedokun"
          labelText="last name"
        />
        <FormRow type="text" name="location" defaultValue="location" />
        <FormRow type="email" name="email" defaultValue="peter@gmail.com" />
        <FormRow type="password" name="password" defaultValue="secret123" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "loading..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
