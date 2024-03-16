import { exit } from "process";
import { DataSource, LocalDataSource, MongoDB } from "../dataSource";
import * as dotenv from "dotenv";

dotenv.config();

const dataSource: DataSource = await new MongoDB().connect();

const r = await dataSource.search("so");
console.log("result:", r);

exit();
