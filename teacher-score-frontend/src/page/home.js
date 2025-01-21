import React from "react";
// import { useState } from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
// import { Radio, RadioGroup } from "@headlessui/react";
import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export default function HomePage() {
  return (
    <div>
      <h1>Hello Home page</h1>
    </div>
  );
}
