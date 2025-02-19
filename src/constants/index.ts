const COLLECTIONS = {
USERS : "users",
PROJECTS: "projects",
TASKS: "tasks"
} as const


type CollectionNames = typeof COLLECTIONS[keyof typeof COLLECTIONS]

export const COLLECTION_NAMES :  Record<CollectionNames, string>= {
    [COLLECTIONS.USERS] : "users",
    [COLLECTIONS.PROJECTS] : "projects",
    [COLLECTIONS.TASKS] : "tasks"
}

export const ROUTER_PREFIX : Record<CollectionNames, string> = {
    [COLLECTIONS.USERS] : "/users",
    [COLLECTIONS.PROJECTS] : "/projects",
    [COLLECTIONS.TASKS] : "/tasks"
}