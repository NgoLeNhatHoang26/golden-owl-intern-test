import { ISubject } from "../interface/subject.interface";
import { ScoreLevel } from "../enums/score-level.enum";

export class BaseSubject implements ISubject {
    constructor(
        public readonly code: string,
        public readonly label: string,
        public readonly dbColumn: string,
        public readonly statisticPrefix: string,
    ) {}

    getScoreLevel(score: number | null): ScoreLevel | null {
        if ( score === null) {
            return null;
        }
        if (score >= 8) {
            return ScoreLevel.EXCELLENT;
        }
        if (score >= 6.5) {
            return ScoreLevel.GOOD;
        }
        if (score >= 5) {
            return ScoreLevel.AVERAGE;
        }
        return ScoreLevel.POOR;
    }

    buildStatisticCountFilter(): string {
        const col = this.dbColumn;
        const prefix = this.statisticPrefix;

        return `
           COUNT(*) FILTER (WHERE ${col} >= 8) AS ${prefix}_excellent,
           COUNT(*) FILTER (WHERE ${col} >= 6 AND ${col} < 8) AS ${prefix}_good,
           COUNT(*) FILTER (WHERE ${col} >= 4 AND ${col} < 6) AS ${prefix}_average,
           COUNT(*) FILTER (WHERE ${col} < 4) AS ${prefix}_poor
        `
    }
}