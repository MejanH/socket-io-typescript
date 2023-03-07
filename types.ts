export interface ServerToClientsEvents {
    message: (props: {
        id: number;
        name: string
        message: string;
    }, room: string) => void
}
export interface ClientToServerEvents {
    message: (room: string | undefined) => void
}