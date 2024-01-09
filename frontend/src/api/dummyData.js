import {faBook, faEarthEurope, faBasketball, faMusic, faBurger, faFilm, faFlask, faBookOpen} from "@fortawesome/free-solid-svg-icons"

export const Categories = [
    {
        title: "Geografija",
        showOnHomePage: true,
        icon: faEarthEurope,
        pagelink: "/kategorije/geografija"
    },
    {
        title: "Povijest",
        showOnHomePage: true,
        icon: faBook,
        pagelink: "/kategorije/povijest"
    },
    {
        title: "Sport",
        showOnHomePage: true,
        icon: faBasketball,
        pagelink: "/kategorije/sport"
    },
    {
        title: "Glazba",
        showOnHomePage: true,
        icon: faMusic,
        pagelink: "/kategorije/glazba"
    },
    {
        title: "Hrana",
        showOnHomePage: false,
        icon: faBurger,
        pagelink: "/kategorije/hrana"
    },
    {
        title: "Film",
        showOnHomePage: false,
        icon: faFilm,
        pagelink: "/kategorije/film"
    },
    {
        title: "Znanost",
        showOnHomePage: false,
        icon: faFlask,
        pagelink: "/kategorije/znanost"
    },
    {
        title: "Književnost",
        showOnHomePage: false,
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
        image: "./logo192"
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
        image: "/logo192"
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
        image: "logo192"
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
        image: "logo192"
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
                a: "Rim"
            },
            {
                q: "Koji je glavni grad Japana?",
                a: "Tokyo"
            },
            {
                q: "Koji je glavni grad Turske?",
                a: "Ankara"
            }
        ]
        
    }
]