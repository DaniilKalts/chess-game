export class Movement {
    logo: string | null;
    coordinate: string;

    constructor(logo: string, coordinate: string) {
        this.logo = logo;
        this.coordinate = coordinate;
    }
}