'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js'
import { database, supabase } from '../database/Database'
import * as zod from "zod";
import { cookies } from 'next/headers'

const userLoginSchema = zod.object({
  email: zod.email("Must be a valid email.")
        .nonempty("You must provide an email."),

  password: zod.string()
  .nonempty("You must provide a password.")

})


export type userLoginOutput = {
  messages?: string[],
  errors? : {
    email?: string[],
    password?: string[]
  }
}

export async function login(prevState: userLoginOutput, formData: FormData): Promise<userLoginOutput> {

  const schemaParse = userLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  if(!schemaParse.success) return {
    messages: ["Unable to log you in"],
    errors: schemaParse.error.flatten().fieldErrors
  }


  const supabase = await createClient()
  
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    
    const { error } = await supabase.auth.signInWithPassword(data)
    
    if (error) {
     return {
      "messages": ["Invalid Credentials"]
     }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}



const userCreationSchema = zod.object({
  name: zod.string().regex(/[a-zA-z]+ [a-zA-z]+/, "You must provide your first and last name."),
  email: zod.email("You must provide a valid email.").nonempty("You must provide an email."),
  password: zod.string().min(8, "Your password must at least 8 characters long.").max(32, "Your password must not be longer than 32 characters.")
});

export type userRegisterOutput = {
  messages?: string[],
  errors?: {
    name?: string[],
    email?: string[],
    password?: string[],
  }
}



export async function signup(prevData: userRegisterOutput, formData: FormData): Promise<userRegisterOutput> {

  const confirmPassword = formData.get("confirmPassword") as string;

  const schemaParse = userCreationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if(!schemaParse.success || confirmPassword!==formData.get("password")){
    const returnErrors =  {
      messages: ["Unable to register your account."],
      errors: {
        ...schemaParse.error?.flatten().fieldErrors
      }
    }

    if(!returnErrors.errors.password) returnErrors.errors.password = [];

    if(confirmPassword !== formData.get("password"))
      returnErrors.errors.password?.push("Passwords must match.");

    return returnErrors;
  }

  const parsedData =  schemaParse.data;

  const isAllowed = (await database`SELECT * FROM roles WHERE email=${parsedData.email}`).length > 0;
  if(!isAllowed)
      redirect("/register/unauthorized");



  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data: SignUpWithPasswordCredentials = {
    email: parsedData.email,
    password: parsedData.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/dashboard`
    }
    
  }


  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return {
      messages: [error.name]
    }
  }

  await database`INSERT INTO emailToName (name, email) VALUES (${parsedData.name,data.email})`;
  
  (await cookies()).set("registerEmail", data.email, {maxAge: 600000});

  revalidatePath('/', 'layout')
  redirect('/register/verify')
}


export async function resendVerificationEmail(email: string){
  const task = await supabase.auth.resend({
    email: email,
    type: "signup",
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/dashboard`
    }
  })

  if(task.error)
    redirect("/error");
}

export async function getEmailByCookies(){
  return (await cookies()).get("registerEmail")?.value
}

export async function getNameByEmail(email: string){
    return (await database<{name: string}[]>`SELECT name FROM emailtoname WHERE email=${email} LIMIT 1`)[0]?.name;
}

export async function forgotPassword(email: string){
  const res = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/dashboard`
  })
}

export async function getRoleByEmail(email: string){
  return (await database<{role: string}[]>`SELECT role FROM roles WHERE email=${email}`)[0].role;
}