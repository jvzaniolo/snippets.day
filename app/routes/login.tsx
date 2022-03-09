import { FiGithub } from 'react-icons/fi';

export default function Login() {
  return (
    <div className="mx-auto flex flex-col space-y-8 ">
      <h1 className="mt-8 text-center font-serif text-5xl">Welcome back</h1>

      {/* {actionData?.error && (
        <div className="text-red-600 text-center">{actionData.error.message}</div>
      )} */}

      <div className="mx-auto flex w-full max-w-sm flex-col rounded-lg bg-white p-6 shadow-2xl dark:bg-moon-800 dark:shadow-black">
        <form action="/login" method="post" className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="dark:text-moon-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700 dark:text-moon-100 dark:placeholder:text-moon-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="dark:text-moon-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full rounded bg-moon-100 p-2 outline-primary-500 focus:outline focus:outline-2 dark:bg-moon-700 dark:text-moon-100 dark:placeholder:text-moon-500"
            />
          </div>

          <button type="submit" className="button primary !mt-10 w-full py-2 text-lg">
            Login
          </button>
        </form>

        <div className="!my-6 flex items-center space-x-6">
          <hr className="w-full dark:border-moon-600 dark:bg-moon-600 dark:text-moon-600" />
          <span className="dark:text-moon-300">OR</span>
          <hr className="w-full dark:border-moon-600 dark:bg-moon-600 dark:text-moon-600" />
        </div>

        <form action="" method="post">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-4 rounded bg-black py-2 text-lg text-white"
          >
            <FiGithub />
            Github
          </button>
        </form>
      </div>
    </div>
  );
}
