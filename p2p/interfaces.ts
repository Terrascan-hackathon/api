export interface IData {
    data: string[] | string
}
export interface IBlock {
    data: IData
    index: number;
    hash: string[];
    previousBlockHash: string;
    timestamp: number;
}

