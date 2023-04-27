export interface NamedAPIResource {
    /** The name of the referenced resource */
    name: string;
    /** The URL of the referenced resource */
    url: string;
}

export interface VersionGameIndex {
    /** The internal id of an API resource within game data */
    game_index: number;
    /** The version relevent to this game index */
    version: NamedAPIResource;
}