// types.d.ts
import { User } from "@supabase/supabase-js";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: User; // Adjust the type based on what Supabase returns for a user
  }
}
