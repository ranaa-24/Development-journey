
const images: string[] = ["https://media.glamourmagazine.co.uk/photos/651ed6cff0d2c7f4c5360ab8/16:9/w_1920,h_1080,c_limit/COZY%20AUTUMN%20MAKEUP%20051023%20default.jpg", 

"https://images.pexels.com/photos/32345078/pexels-photo-32345078/free-photo-of-joyful-child-with-flowers-at-sunset-in-vietnam.jpeg", 

"https://images.pexels.com/photos/27908176/pexels-photo-27908176/free-photo-of-a-little-girl-on-a-swing-with-her-hair-blowing-in-the-wind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];

const length = images.length;
const randomIndex = Math.floor(Math.random() * length);

export const baseImgUrl: string = images[randomIndex];
