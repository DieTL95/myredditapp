import page from "@/app/page";
import { getSubRules } from "@/lib/action";
import { subredditRules } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SubmittionType = "comment" | "post";

const SubmitPostComp = ({ type }: { type: SubmittionType }) => {};

export default SubmitPostComp;
