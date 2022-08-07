import bcrypt from "bcryptjs";

const data={
    users:[
        {
            name:"dave",
            email:"dave@example.com",
            password:bcrypt.hashSync("123456"),
            isAdmin:true
        },{
            name:"john",
            email:"user@example.com",
            password:bcrypt.hashSync("123456"),
            isAdmin:false,
        }
    ],
    products:[
        {
            // _id:'1',
            name:"nike slim shirt",
            slug:'nike-slim-shirt',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:120,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            countInStock:10,
            description:'high quality shirt',

        },
        {
            // _id:'2',
            name:"nike slim ",
            slug:'nike-slim-',
            category:'s',
            image:'/images/p2.jpg',
            price:120,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            countInStock:0,
            description:'high quality ',

        },
        {
            // _id:'3',
            name:"Adidas slim shirt",
            slug:'Adidas-slim-shirt',
            category:'Shirts',
            image:'/images/p3.jpg',
            price:120,
            brand:'Adidas',
            countInStock:10,
            rating:4.5,
            numReviews:10,
            description:'high quality shirt',

        },
        {
            // _id:'4',
            name:"Puma slim shirt",
            slug:'Puma-slim-shirt',
            category:'Shirts',
            image:'/images/p4.jpg',
            price:120,
            brand:'Puma',
            rating:4.5,
            numReviews:10,
            countInStock:10,
            description:'high quality shirt',

        },
    ]
}
export default data