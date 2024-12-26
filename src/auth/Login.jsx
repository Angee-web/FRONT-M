import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config/index";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice"; // Import the clearIntendedRoute action
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux"; // Import useSelector
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // Store the user's ID in localStorage
        const userId = data.payload.user.id; // Adjust the path if necessary
        localStorage.setItem("userId", userId);
        console.log("User ID saved to localStorage:", userId);

        // Show a success toast
        toast({ title: data?.payload?.message });

        // Retrieve the last attempted URL
        const lastAttemptedURL = localStorage.getItem("lastAttemptedURL");

        // Redirect based on role or saved URL
        if (data.payload.user.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate(lastAttemptedURL || "/therapy", { replace: true });
        }

        // Clear the last attempted URL after successful login
        localStorage.removeItem("lastAttemptedURL");
      } else {
        // Show an error toast
        toast({
          title: data?.payload?.message || "Incorrect email or password",
          variant: "destructive",
        });
      }
    });
    // console.log("Form Data:", formData);
  };
   

  return (
    <div className="bg-shadowTherapy bg-cover bg-center min-h-screen flex justify-center items-center px-4 sm:px-8">
      <div className="shadow-lg backdrop-blur bg-black/30 rounded-2xl w-full max-w-lg lg:max-w-2xl flex flex-col justify-center items-center py-8 px-6 sm:py-10 sm:px-12">
        <div className="text-center text-white flex flex-col items-center w-full">
          {/* Back to Home */}
          <div className="self-start mb-4">
            <Link to="/" className="flex items-center gap-1 text-xs sm:text-sm">
              <ArrowLeft className="text-xs" />
              <span className="border-b">Home</span>
            </Link>
          </div>
            <h1 className="list-item-text-3 text-3xl font-bold tracking-tight text-foreground text-white mx-10 mt-5">
              Welcome Back!
            </h1>
            {/* Login Form Component */}
            <div className="text-left px-7">
              <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText="Login"
                borderRadius="rounded-full"
              />
            </div>

            <div>
              <p className="mt-2">
                Don't have an account?
                <Link
                  className="font-medium text-primary text-blue-600 ml-2"
                  to="/auth/register"
                >
                  Sign Up
                </Link>
              </p>
              <p className="mx-2 text-sm">
                <span className="list-item-text-3">Forgot your password?</span>{" "}
                <Link
                  className="text-blue-600 ml-2"
                  to="/auth/forgot-password"
                  onClick={() => console.log("Forgot Password clicked")}
                >
                  Reset it
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Login;
