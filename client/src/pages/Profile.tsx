import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import customFetch from "../utils/CustomFetch";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";
interface UserDetails {
  _id: number;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: string;
}
interface User {
  user: UserDetails;
}

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: any) => {
    const formData = await request.formData();
    const file = formData.get("avatar");
    if (file && file.size > 500000) {
      toast.error("Image size too large");
      return null;
    }
    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
    return null
  };
const Profile = () => {
  const user: User = useOutletContext();
  const { name, email, lastName, location } = user.user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
