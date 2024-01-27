export interface IMenuItem {
    name: string,
    icon: string,
    url: string,
}

export const MENU_DATA: IMenuItem[] = [
    {
      name: 'Новости',
      icon: 'radix-icons:archive',
      url: '/admin',
    },
]