import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const pathname = useLocation().pathname;

  return <header></header>;
});
