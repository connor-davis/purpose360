import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex flex-col w-full h-full justify-center items-center">
      <div class="flex flex-col w-96 h-auto p-5 rounded-lg shadow-2xl shadow-black bg-gray-100 text-black space-y-10">
        <div class="flex flex-col w-full justify-center items-center space-y-5">
          <img src="/logos/PurposeMainLogo.png" width={"256px"} />
          <div class="flex w-full justify-center items-center space-x-1">
            <div class="text-gray-400">Don't have an account?</div>
            <a class="text-lime-400 cursor-pointer" href="/register">Create One</a>
          </div>
        </div>

        <div class="flex flex-col w-full space-y-3">
          <div class="flex flex-col space-y-1">
            <div>
              Email <span class="text-red-500">*</span>
            </div>
            <input
              type="email"
              class="flex items-center p-3 rounded-md bg-gray-200 text-black placeholder:text-gray-600 outline-none"
              placeholder="Your email"
            />
            <div class="text-gray-400 text-sm">
              We'll never share your email.
            </div>
          </div>

          <div class="flex flex-col space-y-1">
            <div>
              Password <span class="text-red-500">*</span>
            </div>
            <input
              type="email"
              class="flex items-center p-3 rounded-md bg-gray-200 text-black placeholder:text-gray-600 outline-none"
              placeholder="Your password"
            />
          </div>
        </div>

        <div class="flex flex-col w-full justify-center items-center">
          <div class="flex w-full h-auto py-3 justify-center items-center bg-lime-400 rounded-md cursor-pointer">
            Login
          </div>
        </div>
      </div>
    </div>
  );
});
