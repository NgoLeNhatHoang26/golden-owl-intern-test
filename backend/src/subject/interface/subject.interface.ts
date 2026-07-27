import { ScoreLevel } from "../enums/score-level.enum";

export interface ISubject {
    readonly code: string;
    readonly label: string;
    readonly dbColumn: string;
    readonly statisticPrefix: string;

    getScoreLevel(score: number | null): ScoreLevel | null;
    buildStatisticCountFilter(): string;
}
