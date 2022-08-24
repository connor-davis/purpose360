import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
  return (
    <div class="flex flex-col w-screen h-screen">
      <Header />
      <div class="flex w-full h-full">
        <Slot />
      </div>
    </div>
  );
});
