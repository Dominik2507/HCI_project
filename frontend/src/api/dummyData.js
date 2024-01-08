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
        autor: "User321",
        autorId: 1,
        category: "Geografija",
        categoryId: 1,
        quizType: "Pitanje - odgovor",
        quizTypeId: 1,
        duration: 30,
        image: "./logo192"
    },{
        title: "Tko je autor?",
        id: 2,
        autor: "MG073",
        autorId: 2,
        category: "Glazba",
        categoryId: 2,
        quizType: "Asocijacije",
        quizTypeId: 2,
        duration: 25,
        image: "/logo192"
    },{
        title: "Tradicionalna jela",
        id: 3,
        autor: "User321",
        autorId: 1,
        category: "Hrana",
        categoryId: 3,
        quizType: "Memory",
        quizTypeId: 4,
        duration: 30,
        image: "logo192"
    },{
        title: "Glavni gradovi",
        id: 4,
        autor: "User321",
        autorId: 1,
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