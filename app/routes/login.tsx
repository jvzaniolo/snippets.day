import { FiGithub } from 'react-icons/fi';
import { ActionFunction, useActionData } from 'remix';
// import { signIn } from '~/utils/auth';

export const action: ActionFunction = async context => {
  console.log(context);

  return {};
};

export default function Login() {
  let actionData = useActionData();

  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Welcome back</h1>

      {actionData?.error && (
        <div className="text-center text-red-600">{actionData.error.message}</div>
      )}

      <div className="mx-auto flex w-full max-w-sm flex-col rounded-lg bg-white p-6 shadow-2xl">
        <form action="/login" method="post" className="space-y-4" id="sign-in-form">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2"
            />
          </div>

          <button
            value="email"
            type="submit"
            formAction="/login?type=email"
            className="button primary !mt-10 w-full py-2 text-lg"
          >
            Login
          </button>
        </form>

        <div className="!my-6 flex items-center space-x-6">
          <hr className="w-full" />
          <span>OR</span>
          <hr className="w-full" />
        </div>

        <button
          form="sign-in-form"
          formAction="/login?type=github"
          className="flex w-full items-center justify-center gap-4 rounded bg-black py-2 text-lg text-white"
        >
          <FiGithub />
          Github
        </button>
      </div>
    </div>
  );
}
