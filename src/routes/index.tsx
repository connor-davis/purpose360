import { component$ } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="flex flex-col w-full h-full px-5 pt-5">
      <div class="flex flex-col w-full h-full bg-gray-100 shadow-2xl shadow-black rounded-t-lg"></div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Home',
};

export const onGet: RequestHandler = async ({ request, response }) => {
	const isAuthorized = false;

	if (!isAuthorized) {
		// User is not authorized!
		// throw the redirect response to 
    // relocate the user to the log-in page
		throw response.redirect('/login');
	} else {
		// ...
	}
};