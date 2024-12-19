export type business = {
    id: string;
    name: string;
    image_url: string;
    location: {
        address1: string;
        city: string;
        state: string;
        zip_code: string;
    }
    url?: string;
    business_hours: {
        open: {
            is_overnight: boolean;
            start: number;
            end: number;
            day: number;
        } [];
        hours_type: string;
        is_open_now: boolean;
    }
    categories: {
        title: string;
    } [];
    rating: number;
    review_count: number;
}

export type openHours = {
    is_overnight: boolean;
    start: number;
    end: number;
    day: number;
}
