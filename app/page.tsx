"use client"

import * as nav from "next/navigation";

export default function base() {
  nav.useRouter().push("/Home")
  return (
    <></>
  );
}
