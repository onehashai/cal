import type { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import type { CountdownApi } from "react-countdown";
import Countdown from "react-countdown";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { isSAMLLoginEnabled } from "@calcom/features/ee/sso/lib/saml";
import { WEBAPP_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { collectPageParameters, telemetryEventTypes, useTelemetry } from "@calcom/lib/telemetry";
import prisma from "@calcom/prisma";
import type { inferSSRProps } from "@calcom/types/inferSSRProps";
import { Alert, Button, EmailField, HeadSeo, InputField, PasswordField, TextField } from "@calcom/ui";

import { asStringOrNull } from "../lib/asStringOrNull";
import { IS_GOOGLE_LOGIN_ENABLED } from "../server/lib/constants";
import { ssrInit } from "../server/lib/ssr";

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordcheck: string;
  apiError: string;
  otp?: string;
};

export default function Signup({ prepopulateFormValues }: inferSSRProps<typeof getServerSideProps>) {
  const { t } = useLocale();
  const router = useRouter();
  const [timer, setTimer] = useState<CountdownApi | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const telemetry = useTelemetry();
  const [otp, setOtp] = useState("");
  const [sendOtpButtonActive, setSendOtpButtonActive] = useState(true);
  const methods = useForm<FormValues>({
    defaultValues: prepopulateFormValues,
  });
  const {
    register,
    formState: { errors, isSubmitting },
  } = methods;
  function checkEmailPattern(email: string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  const handleErrors = async (resp: Response) => {
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.message);
    }
  };
  const resendOtpRenderer = ({ completed, seconds }) => {
    if (completed) {
      return "";
    } else {
      return (
        <p className="text-gray mt-2 flex items-center text-sm text-gray-700">Resend OTP in {seconds}s</p>
      );
    }
  };

  const signUp: SubmitHandler<FormValues> = async (data) => {
    await fetch("/api/auth/signup", {
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(handleErrors)
      .then(async () => {
        telemetry.event(telemetryEventTypes.signup, collectPageParameters());
        await signIn<"credentials">("credentials", {
          ...data,
          callbackUrl: router.query.callbackUrl
            ? `${WEBAPP_URL}/${router.query.callbackUrl}`
            : `${WEBAPP_URL}/getting-started`,
        });
      })
      .catch((err) => {
        methods.setError("apiError", { message: err.message });
      });
  };
  function sendEmail(e: any) {
    e.preventDefault();

    setOtpLoading(true);
    const otp = Math.floor(1000 + Math.random() * 9000);
    const email = methods.getValues().email;
    if (!email || !checkEmailPattern(email)) {
      methods.setError("email", { message: "Please enter a valid email" });
      setOtpLoading(false);
      return;
    }
    methods.clearErrors("email");
    const data = {
      to: email,
      otp: otp,
    };
    console.log(data);
    fetch("/api/auth/sendotptoemail", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(handleErrors)
      .then(async () => {
        console.log("otp", otp);
        setOtp(otp.toString() as string);
        toast.success(" OTP sent to email");
        setOtpLoading(false);
        timer?.start();
        setSendOtpButtonActive(false);
        setTimeout(() => {
          timer?.stop();
          setSendOtpButtonActive(true);
        }, 10000);
      })
      .catch((err) => {
        setOtpLoading(false);
        methods.setError("apiError", { message: err.message });
      });
  }
  function setRef(countdown: Countdown) {
    if (countdown) {
      setTimer(countdown.getApi());
    }
  }
  return (
    <div
      className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <HeadSeo title={t("sign_up")} description={t("sign_up")} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="font-cal text-center text-3xl font-extrabold text-gray-900">
          {t("create_your_account")}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-2 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(signUp)} className="space-y-6 bg-white">
              {errors.apiError && <Alert severity="error" message={errors.apiError?.message} />}
              <div className="space-y-2">
                <TextField
                  addOnLeading={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/`}
                  {...register("username")}
                  required
                />
                <EmailField
                  {...register("email")}
                  disabled={prepopulateFormValues?.email}
                  hasSuffixpadding={false}
                  addOnSuffix={
                    <Button
                      loading={otpLoading}
                      onClick={sendEmail}
                      className=" justify-center"
                      disabled={!sendOtpButtonActive}>
                      send OTP
                    </Button>
                  }
                  className=" inline-block  disabled:bg-gray-200 disabled:hover:cursor-not-allowed"
                />
                {sendOtpButtonActive ? (
                  ""
                ) : (
                  <Countdown ref={setRef} date={Date.now() + 10000} renderer={resendOtpRenderer} />
                )}
                <InputField
                  placeholder="Enter OTP"
                  {...register("otp", {
                    validate: (value) => {
                      if (otp.toString().length > 0 && value == otp) return true;
                      return "Invalid OTP";
                    },
                  })}
                  label="OTP"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
                <PasswordField
                  placeholder="Password length must be atleast 7"
                  labelProps={{
                    className: "block text-sm font-medium text-gray-700",
                  }}
                  {...register("password", {
                    validate: (value: string) => {
                      if (value.length >= 7) return true;
                      return "Password length must be atleast 7";
                    },
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
                <PasswordField
                  label={t("confirm_password")}
                  {...register("passwordcheck", {
                    validate: (value) =>
                      value === methods.watch("password") || (t("error_password_mismatch") as string),
                  })}
                />
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button type="submit" loading={isSubmitting} className="w-7/12 justify-center">
                  {t("create_account")}
                </Button>
                <Button
                  color="secondary"
                  className="w-5/12 justify-center"
                  onClick={() =>
                    signIn("OneHashCal", {
                      callbackUrl: router.query.callbackUrl
                        ? `${WEBAPP_URL}/${router.query.callbackUrl}`
                        : `${WEBAPP_URL}/getting-started`,
                    })
                  }>
                  {t("login_instead")}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const ssr = await ssrInit(ctx);
  const token = asStringOrNull(ctx.query.token);

  const props = {
    isGoogleLoginEnabled: IS_GOOGLE_LOGIN_ENABLED,
    isSAMLLoginEnabled,
    trpcState: ssr.dehydrate(),
    prepopulateFormValues: undefined,
  };

  if (process.env.NEXT_PUBLIC_DISABLE_SIGNUP === "true") {
    return {
      notFound: true,
    };
  }

  // no token given, treat as a normal signup without verification token
  if (!token) {
    return {
      props: JSON.parse(JSON.stringify(props)),
    };
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token,
    },
  });

  if (!verificationToken || verificationToken.expires < new Date()) {
    return {
      notFound: true,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        {
          email: verificationToken?.identifier,
        },
        {
          emailVerified: {
            not: null,
          },
        },
      ],
    },
  });

  if (existingUser) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login?callbackUrl=" + `${WEBAPP_URL}/${ctx.query.callbackUrl}`,
      },
    };
  }

  return {
    props: {
      ...props,
      prepopulateFormValues: {
        email: verificationToken.identifier,
      },
    },
  };
};
