const PORT = process.env.PORT || 8003
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const imdb = [
    {
        id: 1,
        name: 'Esaretin Bedeli',
        image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 1994,
        rating: 9.2,
    },
    {
        id: 2,
        name: 'Baba',
        image: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg',
        year: 1972,
        rating: 9.1,
    },
    {
        id: 3,
        name: 'Baba 2',
        image: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg',
        year: 1974,
        rating: 9.0,
    },
    {
        id: 4,
        name: 'Kara Şövalye',
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 2008,
        rating: 9.0,
    },
    {
        id: 5,
        name: '12 Öfkeli Adam',
        image: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1957,
        rating: 8.9,
    },
    {
        id: 6,
        name: 'Schindler\'in Listesi',
        image: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1993,
        rating: 8.9,
    },
    {
        id: 7,
        name: 'Yüzüklerin Efendisi: Kralın Dönüşü',
        image: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 2003,
        rating: 8.9,
    },
    {
        id: 8,
        name: 'Ucuz Roman',
        image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 1994,
        rating: 8.8,
    },
    {
        id: 9,
        name: 'İyi, Kötü ve Çirkin',
        image: 'https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1966,
        rating: 8.8,
    },
    {
        id: 10,
        name: 'Yüzüklerin Efendisi: Yüzük Kardeşliği',
        image: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 2001,
        rating: 8.8,
    },
    {
        id: 11,
        name: 'Dövüş Kulübü',
        image: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1999,
        rating: 8.8,
    },
    {
        id: 12,
        name: 'Forrest Gump',
        image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 1994,
        rating: 8.7,
    },
    {
        id: 13,
        name: 'Başlangıç',
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 2010,
        rating: 8.7,
    },
    {
        id: 14,
        name: 'Yüzüklerin Efendisi: İki Kule',
        image: 'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 2002,
        rating: 8.7,
    },
    {
        id: 15,
        name: 'Yıldız Savaşları: İmparator',
        image: 'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1980,
        rating: 8.7,
    },
    {
        id: 16,
        name: 'Matrix',
        image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1999,
        rating: 8.6,
    },
    {
        id: 17,
        name: 'Sıkı Dostlar',
        image: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1990,
        rating: 8.6,
    },
    {
        id: 18,
        name: 'Guguk Kuşu',
        image: 'https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY67_CR0,0,45,67_AL_.jpg',
        year: 1975,
        rating: 8.6,
    },
    {
        id: 19,
        name: 'Yedi Samuray-Kanlı Pirinç',
        image: 'https://m.media-amazon.com/images/M/MV5BOWE4ZDdhNmMtNzE5ZC00NzExLTlhNGMtY2ZhYjYzODEzODA1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY67_CR1,0,45,67_AL_.jpg',
        year: 1954,
        rating: 8.6,
    },
    {
        id: 20,
        name: 'Yedi',
        image: 'https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg',
        year: 1995,
        rating: 8.6,
    },
]


app.get('/', (req, res) => {
    res.json(imdb)
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))



