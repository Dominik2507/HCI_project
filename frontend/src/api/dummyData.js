import {faBook, faEarthEurope, faBasketball, faMusic, faBurger, faFilm, faFlask, faBookOpen} from "@fortawesome/free-solid-svg-icons"

export const Categories = [
    {
        title: "Geografija",
        id: 1,
        showonhomepage: true,
        icon: faEarthEurope,
        color:'darkblue',
        pagelink: "/kategorije/geografija"
    },
    {
        title: "Povijest",
        id: 4,
        showonhomepage: true,
        icon: faBook,
        color:'darkred',
        pagelink: "/kategorije/povijest"
    },
    {
        title: "Sport",
        id: 5,
        showonhomepage: true,
        icon: faBasketball,
        color:'darkorange',
        pagelink: "/kategorije/sport"
    },
    {
        title: "Glazba",
        id: 2,
        showonhomepage: true,
        icon: faMusic,
        color:'black',
        pagelink: "/kategorije/glazba"
    },
    {
        title: "Hrana",
        id: 3,
        showonhomepage: false,
        icon: faBurger,
        pagelink: "/kategorije/hrana"
    },
    {
        title: "Film",
        id: 6,
        showonhomepage: false,
        icon: faFilm,
        pagelink: "/kategorije/film"
    },
    {
        title: "Znanost",
        id: 7,
        showonhomepage: false,
        icon: faFlask,
        pagelink: "/kategorije/znanost"
    },
    {
        title: "Književnost",
        id: 8,
        showonhomepage: false,
        icon: faBookOpen,
        pagelink: "/kategorije/knjizevnost"
    }

]

export const Quizes = [
    {
        title: "Glavni gradovi",
        id: 1,
        author: "User321",
        authorId: 1,
        category: "Geografija",
        categoryId: 1,
        quizType: "Pitanje - odgovor",
        quizTypeId: 1,
        duration: 30,
        image: "logo192.png"
    },{
        title: "Tko je autor",
        id: 2,
        author: "MG073",
        authorId: 2,
        category: "Glazba",
        categoryId: 2,
        quizType: "Asocijacije",
        quizTypeId: 2,
        duration: 1000,
        image: "logo192.png"
    },{
        title: "Tradicionalna jela",
        id: 3,
        author: "User321",
        authorId: 1,
        category: "Hrana",
        categoryId: 3,
        quizType: "Memory",
        quizTypeId: 4,
        duration: 30,
        image: "logo192.png"
    },{
        title: "Glavni gradovi",
        id: 4,
        author: "User321",
        authorId: 1,
        category: "Geografija",
        categoryId: 1,
        quizType: "Višestruki izbor",
        quizTypeId: 3,
        duration: 30,
        image: "logo192.png"
    }
]

export const users = [
    {
        username: "user321",
        id: 1,
        email: "user@mail",
        token: null
    },
    {
        username: "MG073",
        id: 2,
        email: "gm@mail",
        token: "qiruezroiqwzeriuqwziruqrwe"
    }
]

export const QuizTypes = [
    {
        name: "Pitanje - odgovor",
        id: 1
    },
    {
        name: "Asocijacija",
        id: 2
    },
    {
        name: "Višestruki odgovor",
        id: 3
    },
    {
        name: "Memory",
        id: 4
    }
]

export const Pitanja = [
    {
        quizId: 1,
        quizTypeId: 1,
        questions: [
            {
                q: "Koji je glavni grad Italije?",
                a: "Rim",
                wa1: "Zagreb",
                wa2: "Ljubljana",
                wa3: "Berlin"
            },
            {
                q: "Koji je glavni grad Japana?",
                a: "Tokyo",
                wa1: "Zagreb",
                wa2: "Ljubljana",
                wa3: "Berlin"
            },
            {
                q: "Koji je glavni grad Turske?",
                a: "Ankara",
                wa1: "Zagreb",
                wa2: "Ljubljana",
                wa3: "Berlin"
            }
        ]
        
    }
]

export const ProfileData = {
    username: "MG073",
    id: 2,
    email: "gm@mail",
    token: "qiruezroiqwzeriuqwziruqrwe",
    image: "logo192.png",
    results: {
        solvedQuizes: 10,
        solvedQuestions: 58,
        timeSpentSolving: 400
    },
    quizes: [
        {
            title: "Glavni gradovi",
            id: 1,
            author: "User321",
            authorId: 1,
            category: "Geografija",
            categoryId: 1,
            quizType: "Pitanje - odgovor",
            quizTypeId: 1,
            duration: 30,
            image: "logo192.png"
        },{
            title: "Tko je autor",
            id: 2,
            author: "MG073",
            authorId: 2,
            category: "Glazba",
            categoryId: 2,
            quizType: "Asocijacije",
            quizTypeId: 2,
            duration: 60,
            image: "logo192.png"
        },{
            title: "Tradicionalna jela",
            id: 3,
            author: "User321",
            authorId: 1,
            category: "Hrana",
            categoryId: 3,
            quizType: "Memory",
            quizTypeId: 4,
            duration: 30,
            image: "logo192.png"
        },{
            title: "Glavni gradovi",
            id: 4,
            author: "User321",
            authorId: 1,
            category: "Kultura",
            categoryId: 4,
            quizType: "Višestruki izbor",
            quizTypeId: 3,
            duration: 30,
            image: "logo192.png"
        }
    ]
}