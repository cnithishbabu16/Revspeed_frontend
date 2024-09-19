export interface Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    speed: number;
    ottPlatforms: OttPlatform[];

}

export interface OttPlatform{
    id: number;
    name : string;
}