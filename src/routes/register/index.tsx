import { $, component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import axios from "axios";

export default component$(() => {
  const success = useStore({ message: undefined });

  const errors = useStore<Array<{ message: string }>>([]);

  const authenticationData = useStore({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const register = $(() => {
    const registerForm = document.getElementById("registerForm");

    (registerForm as HTMLFormElement).checkValidity();

    if ((registerForm as HTMLFormElement).reportValidity()) {
      axios({
        method: "post",
        url: "/api/authentication/register",
        data: `${JSON.stringify(authenticationData)}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        if (response.data.errors) {
          response.data.errors.forEach((error: { message: string }) =>
            errors.push(error)
          );
        }

        if (response.data.success) {
          success.message = response.data.success;

          setTimeout(() => {
            document.location.href = "/";
          }, 1500);
        }
      });
    }
  });

  return (
    <div class="flex flex-col w-full h-full justify-center items-center">
      <form
        id="registerForm"
        class="flex flex-col w-96 h-auto p-5 rounded-lg shadow-2xl shadow-black bg-gray-100 text-black space-y-10"
      >
        <div class="flex flex-col w-full justify-center items-center space-y-5">
          <div class="flex w-full justify-center items-center space-x-1">
            <div class="text-gray-400">Already have an account?</div>
            <a class="text-lime-400 cursor-pointer" href="/login">
              Authenticate
            </a>
          </div>
        </div>

        {errors.length > 0 && (
          <div class="flex flex-col w-full h-auto space-y-2">
            {errors.map((error) => (
              <div class="w-full h-auto p-2 rounded-md border-2 border-dashed border-red-500 bg-red-300 text-red-600">
                {error.message}
              </div>
            ))}
          </div>
        )}

        {success.message && (
          <div class="w-full h-auto p-2 rounded-md border-2 border-dashed border-green-500 bg-green-300 text-green-600">
            {success.message}
          </div>
        )}

        <div class="flex flex-col w-full space-y-3">
          <div class="flex flex-col space-y-1">
            <div>
              Email <span class="text-red-500">*</span>
            </div>
            <input
              required
              id="email"
              name="email"
              type="email"
              class="flex items-center p-3 rounded-md bg-gray-200 text-black placeholder:text-gray-600 outline-none"
              placeholder="Your email"
              value={authenticationData.email}
              onKeyup$={(event) =>
                (authenticationData.email = (
                  event.target as HTMLInputElement
                ).value)
              }
            />
            <div class="text-gray-400 text-sm">
              We'll never share your email.
            </div>
          </div>

          <div class="flex flex-col w-full space-y-2">
            <div class="flex flex-col space-y-1">
              <div>
                Password <span class="text-red-500">*</span>
              </div>
              <input
                required
                id="password"
                name="password"
                type="password"
                class="flex items-center p-3 rounded-md bg-gray-200 text-black placeholder:text-gray-600 outline-none"
                placeholder="Your password"
                value={authenticationData.password}
                onKeyup$={(event) =>
                  (authenticationData.password = (
                    event.target as HTMLInputElement
                  ).value)
                }
              />
            </div>
            <div class="flex flex-col space-y-1">
              <div>
                Confirm Password <span class="text-red-500">*</span>
              </div>
              <input
                required
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                class="flex items-center p-3 rounded-md bg-gray-200 text-black placeholder:text-gray-600 outline-none"
                placeholder="Confirm your password"
                value={authenticationData.confirmPassword}
                onKeyup$={(event) =>
                  (authenticationData.confirmPassword = (
                    event.target as HTMLInputElement
                  ).value)
                }
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col w-full justify-center items-center">
          <div
            class="flex w-full h-auto py-3 justify-center items-center bg-lime-400 rounded-md cursor-pointer"
            onClick$={() => register()}
          >
            Register
          </div>
        </div>
      </form>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Register",
};
