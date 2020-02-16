
const ordinalBits = 10;
const sequenceBits = 12;
const timestampShift = ordinalBits + sequenceBits;
const sequenceMask = -1 ^ (-1 << sequenceBits);

export class SnowflakeGenerator {
    private ordinal: number;
    private epoch: number;
    private sequence: number = 0;
    private lastTimestamp: number;

    constructor(ordinal: number, epoch: number) {
        this.ordinal = ordinal;
        this.epoch = epoch;
        this.lastTimestamp = epoch;
    }

    newSnowflake(timestamp: number) {
        if (this.lastTimestamp > timestamp) {
            throw "Time moving backwards!";
        } else if (this.lastTimestamp == timestamp) {
            this.sequence = (this.sequence + 1) & sequenceMask;
            if (this.sequence === 0) {
                throw "Sequence Overrun";
            }
        } else {
            this.sequence = 0;
        }
            let lt = this.lastTimestamp;
            this.lastTimestamp = timestamp;
            return {snowflake:
                (((BigInt(timestamp) - BigInt(this.epoch)) << BigInt(timestampShift)) |
                (BigInt(this.ordinal) << BigInt(ordinalBits)) |
                BigInt(this.sequence)).toString()
            , sequence:  this.sequence, lastTimestamp: lt.toString(), timestamp: timestamp.toString(), ordinal: this.ordinal, epoch: this.epoch.toString()};
    }
}