export interface Slider {
    ID: number;
    titleKA: string;
    titleEN: string;
    imageUrl: String;
    date: string;
}

export interface SliderParams {
    titleKA: string;
    titleEN: string;
    image: File | null;
    date: string;
}