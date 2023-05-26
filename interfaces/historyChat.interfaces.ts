export interface IMessage {
    _id: string
    role: "user" | "assistant"
    content: string
}
export interface IHistoryChat {
    _id: string
    chat_id: string
    messages: IMessage[]
}