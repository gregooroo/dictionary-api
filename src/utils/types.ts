type UserInfo = { _id: string; username: string };

export function isUser(obj: unknown): obj is UserInfo {
    return (
        obj != null &&
        typeof (obj as UserInfo)._id === "string" &&
        typeof (obj as UserInfo).username === "string"
    );
}
