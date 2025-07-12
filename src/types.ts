export interface task{
    id: string;
    title: string;
    done:boolean;
}

export type taskfilter = "all" | "todo" | "done";