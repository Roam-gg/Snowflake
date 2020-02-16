import { SnowflakeGenerator } from "../snowflake";


describe("Snowflake tests", () => {
    let generator: SnowflakeGenerator;
    beforeAll(() => {
        generator = new SnowflakeGenerator(0, 1420070400000);
    })
    it("check with start timestamp", () => {
        expect(generator.newSnowflake(1420070400000)).toStrictEqual({
            epoch: "1420070400000",
            lastTimestamp: "1420070400000",
            ordinal: 0,
            sequence: 1,
            snowflake: "1",
            timestamp: "1420070400000"
        })
    })
    it("check with random timestamp", () => {
        expect(generator.newSnowflake(1472769645844)).toStrictEqual({
            epoch: "1420070400000",
            lastTimestamp: "1420070400000",
            ordinal: 0,
            sequence: 0,
            snowflake: "221036657640472576",
            timestamp: "1472769645844"
        });
    });
});