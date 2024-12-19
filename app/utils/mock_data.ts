import { business } from "./definitions"

export const businesses: business[] = [
    {
        id: '123456',
        name: 'Business Name',
        image_url: '/image_url',
        location: {
            address1: '101 Main St',
            city: 'City',
            state: 'State',
            zip_code: '12345'
        },
        business_hours: {
            open:[
                {
                    is_overnight: false,
                    start: 1330,
                    end: 1500,
                    day: 1
                },
                {
                    is_overnight: false,
                    start: 1600,
                    end: 2200,
                    day: 1
                },
                {
                    is_overnight: false,
                    start: 1330,
                    end: 2200,
                    day: 2
                },
                {
                    is_overnight: false,
                    start: 1100,
                    end: 1200,
                    day: 3
                },
                {
                    is_overnight: true,
                    start: 1700,
                    end: 100,
                    day: 4
                }
            ],
            hours_type: 'REGULAR',
            is_open_now: true
        },
        categories: [{
            title: 'Italian'
        }],
        rating: 5,
        review_count: 1000
    }
]