export interface IHeaderItem {
    name: string
    url: string
}

export const HEADER_DATA: IHeaderItem[] = [
    {
        name: 'Последние новости',
        url: '/newslist',
    },
    {
        name: 'Молодежные новости Башкортостана',
        url: '/',
    },
]