import express, { Response } from "express";
import { SnowflakeGenerator } from "./snowflake";

export function cleanInt(x: string): number {
    const y = Number(x);
    return y >= 0 ? Math.floor(y) : Math.ceil(y);
}

const PORT = process.env.PORT || 8080;
const ORDINAL = cleanInt(process.env.ORDINAL) || 0;
const EPOCH = cleanInt(process.env.EPOCH) || 1577836800;
const DEBUG = (process.env.DEBUG === "true") || true;

const app = express();
const generator = new SnowflakeGenerator(ORDINAL, EPOCH);

app.get("/", (req, res) => {
    let snowflake = generator.newSnowflake(Math.round(Date.now() / 1000));
    if (DEBUG) {
        res.send(snowflake);
    } else {
        res.send({snowflake: snowflake.snowflake});
    }
});

app.listen(PORT, () => console.log(`Snowflake generator listening on port: ${PORT}`));