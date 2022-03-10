import { json, redirect } from 'remix';
import supabase from '~/services/supabase';

type CustomFormData = {
  _action: 'email' | 'github';
  email: string | undefined;
  password: string;
};

export async function signIn(data: FormData) {
  const { _action, ...values } = Object.fromEntries(data) as CustomFormData;

  if (_action === 'github') {
    const { user, session, error } = await supabase.auth.signIn({ provider: 'github' });

    if (error) return new Response(error?.message, { status: error?.status || 500 });

    return redirect('/');
  } else if (_action === 'email') {
    const { user, session, error } = await supabase.auth.signIn({
      email: values.email,
      password: values.password,
    });

    if (error) return new Response(error?.message, { status: error?.status || 500 });

    return redirect('/');
  }
}
