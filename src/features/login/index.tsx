"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";
import { LoginSchema } from "./schema";
import { useFormik } from "formik";
import useLogin from "@/api/hooks/auth/useLogin";

const LoginPage = () => {
  const { mutateAsync: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <main className="flex justify-center pt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@mail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.email && !!formik.errors.email ? (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mt-4 flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.password && !!formik.errors.password ? (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              ) : null}
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Log in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
