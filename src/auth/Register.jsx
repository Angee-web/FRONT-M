import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config/index";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  //the local state i'm not using redux for it
  const [formData, setFormData] = useState(initialState);
  //The useDispatch hook from react-redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //The useToast hook is a custom hook that I created to display toast notifications. from shacdn
  const { toast } = useToast();

  function onSumbit(e) {
    e.preventDefault();
    // So basically, when the form is submitted and it's successful, the user is redirected to the login page.
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        console.log(data.payload)
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        // console.error("Registration failed:", data.payload); // Log any error details
        toast({
          title: data?.payload?.message || "Registration failed User Already Existed.",
          variant: 'destructive' // This is a variant of the toast notification
        });
      }
    });
    console.log(formData);
  }
  return (
    <div className="bg-shadowTherapy bg-cover bg-center h-screen flex justify-center items-center ">
      <div className="shadow-lg backdrop-blur-lg bg-white/15 rounded-2xl  lg:h-[70%] flex justify-center items-center ">
        <div className="mx-auto w-full max-w-md space-y-6 flex justify-center px-7 py-10 lg:py-[10rem] items-center">
          <div className="text-center text-white  rounded-xl py-7  flex flex-col ">
            <div>
              <Link
                to="/"
                className="flex justify-start items-center ml-5 gap-1 text-xs"
              >
                <ArrowLeft className="text-xs " />
                <h2 className="border-b">Home</h2>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-white mx-10 mt-5">
              Create new account!
            </h1>
            {/* This is my form component */}
            <div className="text-left px-7">
              <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSumbit}
                buttonText="Sign Up"
                borderRadius="rounded-full"
              />
            </div>

            <div>
              <p className="mt-2">
                Already have an account?
                <Link
                  className="font-medium text-primary text-blue-600 ml-2"
                  to="/auth/login"
                >
                  Login
                </Link>
              </p>
              <p className="mx-2 text-sm">
                <span>Note:</span> Lorem ipsum dolor sit amet consectetur.
                Fermentum nisl netus pulvinar aliquam hendrerit nunc. Tristique
                pretium ipsum faucibus potenti massa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
