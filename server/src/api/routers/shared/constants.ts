import dotenv from "dotenv";
import { Config } from "@/shared/types";

dotenv.config();
export const API_NAMESPACE: string = (process.env as Config).API_PREFIX;
